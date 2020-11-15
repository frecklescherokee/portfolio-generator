const inquirer = require('inquirer');

// This will import the exported object from generate-site.js, 
// allowing us to use generateSite.writeFile() and generateSite.copyFile()
// const generateSite = require('./utils/generate-site.js');

// cleaner version of the code above that uses destructuring
const { writeFile, copyFile } = require('./utils/generate-site.js');

const generatePage = require('./src/page-template');



const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name bitch!');
              return false;
            }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('bitch please enter your github user name!');
              return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]);
  };

  const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
    portfolioData.projects = [];
  } 
    
    console.log(`
  =================
  Add a New Project
  =================
  `);
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your project name!');
              return false;
            }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter a description, bitch!');
              return false;
            }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Bitch enter your github link bitch!');
              return false;
            }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
      
  };

  // easy to read version of the multiple methods in a row
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });

//   // hard to read version of the multiple methods in a row
//   promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);

//     fs.writeFile('./index.html', pageHTML, err => {
//       if (err) throw new Error(err);

//       console.log('Page created! Check out index.html in this directory to see it!');
//     });
//   });

// const mockData = 
// {
//     name: 'brandon',
//     github: 'gay-randy',
//     confirmAbout: true,
//     about:
//       'litle furry gay dude.  Love gay stuff.',
//     projects: [
//       {
//         name: 'Butt Buddy',
//         description:
//           'learn to unclench.  Very important',
//         languages: ['HTML', 'CSS'],
//         link: 'https://github.com/lernantino/run-buddy',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'cockinator',
//         description:
//           'Learn the secrets of cock',
//         languages: ['JavaScript', 'HTML', 'CSS'],
//         link: 'https://github.com/lernantino/taskinator',
//         feature: true,
//         confirmAddProject: true
//       },
//       {
//         name: 'blowjobs Pro',
//         description:
//           'learn to give amazing blowjobs.',
//         languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//         link: 'https://github.com/lernantino/taskmaster-pro',
//         feature: false,
//         confirmAddProject: true
//       },
//       {
//         name: 'Male Gladiators',
//         description:
//           'Gay Robots fighting',
//         languages: ['JavaScript'],
//         link: 'https://github.com/lernantino/robot-gladiators',
//         feature: false,
//         confirmAddProject: false
//       }
//     ]
//   };

    
// var runPageWithMockData = function () 
// {
//     const pageHTML = generatePage(mockData);
//     fs.writeFile
//     ('./dist/index.html', pageHTML, err => 
//     {
//       if (err) throw new Error(err);

//       console.log('Page created! Check out index.html in this directory to see it!');

//         fs.copyFile
//         ('./src/style.css', './dist/style.css', err => 
//         {
//             if (err) 
//             {
//                 console.log(err);
//                 return;
//             }
//             console.log('Style sheet copied successfully!');
//         }
//         );
//     }
//     )
// };

//   runPageWithMockData();
