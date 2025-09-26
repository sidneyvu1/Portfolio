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
            <img src="${project.projectImage}" alt="project image">
            <div id = "projectDesc", class = "project">
                <h3>${project.projectName}</h3>
                <p>${project.description}</p>
                <a href="${project.githubLink}">View on GitHub</a>
            </div>
        </div>
        `
}
