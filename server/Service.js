const GitHub = require('github');
const Contributor = require('./models/Contributor');
const Repository = require('./models/Repository');
const imageUrls = require('./imageUrls');

class Service {
  constructor() {
    this.github = new GitHub();
  }

  start() {
    this.update();
    setInterval(this.update.bind(this), 1800000); // 30 min
  }

  async update() {
    const repos = await this.loadRepositories();
    const { contributors, contributorsPerRepo } = await this.loadContributors(repos);

    const repositoryModels = repos.map(repo => new Repository({
      ...repo,
      contributors: contributorsPerRepo[repo.name],
    }));
    Service.storeRepositories(repositoryModels);

    const contributorModels = contributors.map(contributor =>
      new Contributor(contributor));
    Service.storeContributors(contributorModels);
  }

  async loadRepositories() {
    // Assume a maximum of 100 repos
    const repos = await this.github.repos.getForOrg({
      org: 'jboss-outreach',
      per_page: 100,
    });
    return repos.data.map(repo => ({
      name: repo.name,
      image: imageUrls[repo.name],
    }));
  }

  async loadContributors(repos) {
    const contributors = [];
    const contributorsPerRepo = {};

    function store(data, repoName) {
      if (Object.prototype.hasOwnProperty.call(contributorsPerRepo, repoName)) {
        contributorsPerRepo[repoName] += data.length;
      } else {
        contributorsPerRepo[repoName] = data.length;
      }

      data.forEach((datum) => {
        const index = contributors.findIndex(contributor =>
          datum.login === contributor.name);
        if (index >= 0) {
          contributors[index].contributions += datum.contributions;
        } else {
          contributors.push({
            name: datum.login,
            avatar: datum.avatar_url,
            contributions: datum.contributions,
            profile: datum.html_url,
          });
        }
      });
    }

    // Assume a maximum of 100 contributors per repo
    const requests = repos.reduce((acc, cur) =>
      acc.concat(this.github.repos.getContributors({
        owner: 'jboss-outreach',
        repo: cur.name,
        page: 1,
        per_page: 100,
      }).then(res => store(res.data, cur.name))), []);
    await Promise.all(requests);

    return {
      contributors: contributors.sort((a, b) => b.contributions - a.contributions),
      contributorsPerRepo,
    };
  }

  static async storeContributors(contributors) {
    try {
      await Contributor.collection.drop();
      await Contributor.insertMany(contributors);
    } catch (err) {
      console.log(err);
    }
  }

  static async storeRepositories(repositories) {
    try {
      await Repository.collection.drop();
      await Repository.insertMany(repositories);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Service;
