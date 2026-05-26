getData();

async function getData() {
    try {

        const res = await fetch("./info.json");
        if(!res.ok) {
            throw new Error("could not fetch");
        }

        const data = await res.json();

        const experiences = data.experiences
        const projects = data.projects
        const skills = data.skills
        
        document.getElementById('timeline').innerHTML = `${experiences.map((job, index) => jobTemplate(job, index)).join("") } `
        document.getElementById('projectdiv').innerHTML = `${projects.map(projectTemplate).join("")}`
        document.getElementById('logoSlide').innerHTML = `${skills.map(function(skill) {
            return `<img src = "${skill.skillImage}"></img>`
        }).join("")}`
        document.getElementById('logoSlide2').innerHTML = `${skills.map(function(skill) {
            return `<img src = "${skill.skillImage}"></img>`
        }).join("")}`
        
    } catch (error) {
        console.error(error)
    }
}

function description(description) {
    return `
    <ul>
        ${description.map(function(bullet) {
            return `<li>${bullet}</li>`
        }).join("")}
    </ul>
    `
}

function projectSkills(skills) {
    return `
    <ul>
        ${skills.map(function(skill) {
            return `<li>${skill}</li>`
        }).join("")}
    </ul>
    `
}

function projectImages(imgs) {
    return `
        ${imgs.map( img => `<img src="${img}" alt="projectImage">`).join("")}

    `
}

function jobTemplate(job, index) {
    let arrowSide = ""
    let containerSide = "container left"

    if (index % 2 === 0) {
        arrowSide = "leftArrow"
        containerSide = "container left"
    }
    else if (index % 2 === 1) {
        arrowSide = "rightArrow"
        containerSide = "container right"
    }

    return `<div class="${containerSide}">
                <img src="${job.imageURL}" alt="thing" >
                <div class="textbox">
                    <h4>${job.jobName}</h4>
                    <small>${job.duration}</small>
                    ${description(job.description)}
                    <span class="${arrowSide}"></span>
                </div>
            </div>`
}

function projectTemplate(project) {
    return `<div class="projects">
            <img class = "projlogo" src="${project.projectImage}" alt="project logo">
            <div id = "projectDesc", class = "project">
                <h3>${project.projectName}</h3>
                <p>${project.description}</p>
                <div class = "projimages">
                    ${project.images ? projectImages(project.images) : ''}
                </div>
                <a href="${project.githubLink}">View on GitHub</a>
                ${projectSkills(project.stack)}
            </div>
        </div>
        `
}

document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} Sidney Vu. All rights reserved.`;