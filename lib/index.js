/**
 * Convert Resources JSON to Resources MD
 */

const fs = require("fs");
const path = require("path");
const RESOURCES = require("../src/data/resources");

const MD_PATH = path.join(__dirname, "../RESOURCES.md");

let tableOfContents = "";
let resources = `\n## Collection`;

let INTRODUCTION_MD = `
# Resources

Incredible resources (with links) to help up-skill yourselves on various fields. Resources like programming, designing, engineering and much more and completely Open Source. Made with ♥ by Kunal Keshan.

**Table of Contents**:

- [Collection](#collection)
`;

function convertResourceToMd({ name, description, url, icon, github, tags }) {
  return `

### ${name}

| <img src="${icon}" alt="${name} logo" width="80px" height="auto" /> | ${description} | ${tags
    .map((tag) => `\`${tag}\``)
    .join(", ")} |
| --- | --- | --- |

> Visit Website: [${url}](${url})

${github ? `> Visit GitHub: [${github}](${github})` : ""}

---

`;
}

function createResourcesTableOfContent({ name = "" }) {
  let id = name.replace(/[\W+]|[\s+]/gi, "-").toLowerCase();
  id = id.replace("--", "-");
  id = id.charAt(id.length - 1) === "-" ? id.substring(0, id.length - 1) : id;
  return `[${name}](#${id}), `;
}

RESOURCES.forEach((resource, index) => {
  tableOfContents +=
    index === 0
      ? `\t- ${createResourcesTableOfContent(resource)}`
      : createResourcesTableOfContent(resource);
  resources += convertResourceToMd(resource);
});

INTRODUCTION_MD += tableOfContents + "\n" + resources;

fs.writeFileSync(MD_PATH, INTRODUCTION_MD);
