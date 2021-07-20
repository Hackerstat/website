<p align="center">
  <img src="https://my-cdn-lk30rbldf-cgunter1.vercel.app/HackerStatFullLogoLightMode.png" width="300px"/>
  <h1 align="center">Hackerstat</h1>
</p>

<span>
  <img src="https://img.shields.io/github/issues/Hackerstat/website?color=green&logoColor=blue&style=flat-square" />
   <img src="https://img.shields.io/github/stars/Hackerstat/website?color=green&style=flat-square" />
   <img src="https://img.shields.io/github/workflow/status/Hackerstat/website/CI?style=flat-square" />
</span>

### **What is this Website?**
> HackerStat is a website that allows developers to be able aggregate their achievements, work experience, and code into one place that is accessible to recruiters and other developers. HackerStat allows multiple integrations for developers to connect their work from other sites (i.e. Github) to their HackerStat Profile. One important thing we do enforce in some of our integrations so far is verification. Certain integrations can be added only through a OAuth process with that integration's website.

### **How are HackerStat users' integrations verified?**
> HackerStat users' integrations are verified in one of two ways: via OAuth2 or HackerStat Account URL verification. For instance, GitHub are verified using OAuth 2 where a user logs into their GitHub account to retrieve their GitHub info and repos. While for StackOverflow, a user puts a link to their HackerStat account (i.e. `https://hackerstats.io/username`) in their StackOverflow account's bio. This link verifies the HackerStat user's ownership StackOverflow account.

### **What integrations are included?**

Integrations | User Verification | Type Of Verifications
------------- | ----------- | -----------
GitHub | <div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Eo_circle_green_white_checkmark.svg" width="20px"/></div> | <div align="center">OAuth2</div>
GitLab | <div align="center"><img src="https://www.iconsdb.com/icons/preview/soylent-red/x-mark-3-xxl.png" width="20px"/></div> | <div align="center">OAuth2</div>
WakaTime | <div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Eo_circle_green_white_checkmark.svg" width="20px"/></div> | <div  align="center">N/A</div>
Work Experience | <div align="center">N/A</div> | <div align="center">N/A</div>
StackOverflow | <div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Eo_circle_green_white_checkmark.svg" width="20px"/></div> | <div align="center">URL</div>
Medium | <div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Eo_circle_green_white_checkmark.svg" width="20px"/></div> | <div align="center">URL</div>
Twitter | <div align="center"><img src="https://www.iconsdb.com/icons/preview/soylent-red/x-mark-3-xxl.png" width="20px"/></div> | <div align="center">N/A</div>
Behance | <div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Eo_circle_green_white_checkmark.svg" width="20px"/></div> | <div align="center">URL</div>
Dribbble | <div align="center"><img src="https://upload.wikimedia.org/wikipedia/commons/8/8b/Eo_circle_green_white_checkmark.svg" width="20px"/></div> | <div align="center">URL</div>


### **Tools Used**

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Editor Config](https://editorconfig.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Chart.js](https://www.chartjs.org/docs/latest/)

### Getting Started

If you are interested in downloading this repo, here are some steps:

1. You need to message Repo Member [Cgunter1](https://github.com/Cgunter1) and ask for the _.env.local_ file. This file will allow access to important features for the app (i.e. Auth0).
2. Next, you need to add that _.env.local_ file to the root of the repo.
3. Then you need to go on the command line in the root of the repo and run `npm i`. This will download all the modules in order to get the repo running.
4. Lastly, you need to run `npm run dev` in the root of the repo. This command will run the website on [localhost:3000](http://localhost:3000) if port 3000 is not currently in use.

### Troubleshooting

Any questions, issues, or comments let us know!!!
