// =========================================
// Resume Builder Pro V2
// PART 1
// =========================================

// --------------------
// Personal Inputs
// --------------------

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const summaryInput = document.getElementById("summary");
const photoInput = document.getElementById("photo");

// --------------------
// Preview
// --------------------

const pname = document.getElementById("pname");
const pemail = document.getElementById("pemail");
const pphone = document.getElementById("pphone");
const psummary = document.getElementById("psummary");
const profilePreview = document.getElementById("profilePreview");

// --------------------
// Live Preview
// --------------------

function updatePreview(){

    pname.textContent =
        nameInput.value || "Your Name";

    pemail.textContent =
        emailInput.value || "Email";

    pphone.textContent =
        phoneInput.value || "Phone";

    psummary.textContent =
        summaryInput.value || "Write your professional summary here...";
}

// --------------------
// Save Data
// --------------------

function savePersonal(){

    localStorage.setItem("name",nameInput.value);
    localStorage.setItem("email",emailInput.value);
    localStorage.setItem("phone",phoneInput.value);
    localStorage.setItem("summary",summaryInput.value);

}

// --------------------
// Live Update
// --------------------

[nameInput,emailInput,phoneInput,summaryInput].forEach(input=>{

    input.addEventListener("input",()=>{

        updatePreview();

        savePersonal();

    });

});

// --------------------
// Photo Upload
// --------------------

photoInput.addEventListener("change",function(){

    const file=this.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(e){

        profilePreview.src=e.target.result;

        localStorage.setItem("photo",e.target.result);

    }

    reader.readAsDataURL(file);

});

// --------------------
// Load Saved Data
// --------------------

window.addEventListener("load",()=>{

    nameInput.value=localStorage.getItem("name")||"";
    emailInput.value=localStorage.getItem("email")||"";
    phoneInput.value=localStorage.getItem("phone")||"";
    summaryInput.value=localStorage.getItem("summary")||"";

    const savedPhoto=localStorage.getItem("photo");

    if(savedPhoto){

        profilePreview.src=savedPhoto;

    }

    updatePreview();

});

// --------------------
// Download PDF
// --------------------

document.getElementById("downloadBtn").onclick=function(){

    html2pdf().from(document.querySelector(".preview")).save("Resume.pdf");

}
// =========================================
// PART 2
// Sidebar + Education + Experience
// =========================================

// --------------------
// Sections
// --------------------

const personalSection=document.getElementById("personalSection");
const educationSection=document.getElementById("educationSection");
const experienceSection=document.getElementById("experienceSection");
const skillsSection=document.getElementById("skillsSection");
const projectsSection=document.getElementById("projectsSection");

// --------------------
// Buttons
// --------------------

document.getElementById("personalBtn").onclick=()=>showSection("personal");

document.getElementById("educationBtn").onclick=()=>showSection("education");

document.getElementById("experienceBtn").onclick=()=>showSection("experience");

document.getElementById("skillsBtn").onclick=()=>showSection("skills");

document.getElementById("projectsBtn").onclick=()=>showSection("projects");

// --------------------
// Navigation
// --------------------

function showSection(section){

    personalSection.style.display="none";
    educationSection.style.display="none";
    experienceSection.style.display="none";
    skillsSection.style.display="none";
    projectsSection.style.display="none";

    switch(section){

        case "personal":
            personalSection.style.display="block";
            break;

        case "education":
            educationSection.style.display="block";
            break;

        case "experience":
            experienceSection.style.display="block";
            break;

        case "skills":
            skillsSection.style.display="block";
            break;

        case "projects":
            projectsSection.style.display="block";
            break;

    }

}

// --------------------
// Education
// --------------------

document.getElementById("addEducation").onclick=function(){

    const degree=document.getElementById("degree").value.trim();

    const college=document.getElementById("college").value.trim();

    const year=document.getElementById("year").value.trim();

    if(!degree||!college||!year){

        alert("Please fill all Education fields.");

        return;

    }

    const preview=document.getElementById("educationPreview");

    if(preview.innerHTML.includes("No Education")){

        preview.innerHTML="";

    }

    preview.innerHTML+=`

        <div class="resume-card">

            <strong>${degree}</strong><br>

            ${college}<br>

            ${year}

            <hr>

        </div>

    `;

    document.getElementById("degree").value="";
    document.getElementById("college").value="";
    document.getElementById("year").value="";

}

// --------------------
// Experience
// --------------------

document.getElementById("addExperience").onclick=function(){

    const company=document.getElementById("company").value.trim();

    const designation=document.getElementById("designation").value.trim();

    const duration=document.getElementById("duration").value.trim();

    const desc=document.getElementById("expDescription").value.trim();

    if(!company||!designation){

        alert("Please fill Company and Designation.");

        return;

    }

    const preview=document.getElementById("experiencePreview");

    if(preview.innerHTML.includes("No Experience")){

        preview.innerHTML="";

    }

    preview.innerHTML+=`

        <div class="resume-card">

            <strong>${designation}</strong><br>

            ${company}<br>

            ${duration}<br><br>

            ${desc}

            <hr>

        </div>

    `;

    document.getElementById("company").value="";
    document.getElementById("designation").value="";
    document.getElementById("duration").value="";
    document.getElementById("expDescription").value="";

}
// =========================================
// PART 3
// Skills
// =========================================

document.getElementById("addSkill").onclick = function () {

    const skill = document.getElementById("skillInput").value.trim();

    if (skill === "") {
        alert("Please enter a skill.");
        return;
    }

    const preview = document.getElementById("skillsPreview");

    if (preview.innerHTML.includes("No Skills")) {
        preview.innerHTML = "";
    }

    preview.innerHTML += `
        <span class="skill-badge">
            ${skill}
        </span>
    `;

    document.getElementById("skillInput").value = "";

}
// =========================================
// Projects
// =========================================

document.getElementById("addProject").onclick = function () {

    const name = document.getElementById("projectName").value.trim();

    const description = document.getElementById("projectDescription").value.trim();

    if (name === "") {

        alert("Enter project name.");

        return;

    }

    const preview = document.getElementById("projectsPreview");

    if (preview.innerHTML.includes("No Projects")) {

        preview.innerHTML = "";

    }

    preview.innerHTML += `

        <div class="resume-card">

            <strong>${name}</strong>

            <p>${description}</p>

            <hr>

        </div>

    `;

    document.getElementById("projectName").value = "";
    document.getElementById("projectDescription").value = "";

}
// =========================================
// Dark Mode
// =========================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = function () {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
    );

}

window.addEventListener("load", () => {

    if (localStorage.getItem("theme") === "true") {

        document.body.classList.add("dark");

    }

});
// =========================================
// Resume Template
// =========================================

const selector = document.getElementById("templateSelector");

selector.onchange = function () {

    const resume = document.querySelector(".resume");

    resume.className = "preview resume";

    resume.classList.add(this.value);

}
// =========================================
// Save Resume
// =========================================

document.getElementById("saveBtn").onclick = function () {

    const data = {

        name: nameInput.value,

        email: emailInput.value,

        phone: phoneInput.value,

        summary: summaryInput.value,

        education: document.getElementById("educationPreview").innerHTML,

        experience: document.getElementById("experiencePreview").innerHTML,

        skills: document.getElementById("skillsPreview").innerHTML,

        projects: document.getElementById("projectsPreview").innerHTML

    };

    localStorage.setItem("resumeData", JSON.stringify(data));

    alert("Resume Saved Successfully!");

}
// =========================================
// Export Resume
// =========================================

document.getElementById("exportBtn").onclick = function () {

    const data = localStorage.getItem("resumeData");

    if (!data) {

        alert("Please save resume first.");

        return;

    }

    const blob = new Blob([data], {

        type: "application/json"

    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "resume.json";

    link.click();

}
// =========================================
// Import Resume
// =========================================

document.getElementById("importFile").addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        const data = JSON.parse(reader.result);

        nameInput.value = data.name || "";
        emailInput.value = data.email || "";
        phoneInput.value = data.phone || "";
        summaryInput.value = data.summary || "";

        document.getElementById("educationPreview").innerHTML =
            data.education || "No Education Added";

        document.getElementById("experiencePreview").innerHTML =
            data.experience || "No Experience Added";

        document.getElementById("skillsPreview").innerHTML =
            data.skills || "No Skills Added";

        document.getElementById("projectsPreview").innerHTML =
            data.projects || "No Projects Added";

        updatePreview();

        localStorage.setItem("resumeData", JSON.stringify(data));

        alert("Resume Imported Successfully!");

    }

    reader.readAsText(file);

});
const menuBtn = document.getElementById("menuBtn");

const closeSidebar = document.getElementById("closeSidebar");

const sidebar = document.querySelector(".sidebar");

menuBtn.onclick = function(){

    sidebar.classList.add("active");

}

closeSidebar.onclick = function(){

    sidebar.classList.remove("active");

}
document.addEventListener("click", function(e){

    if(
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ){
        sidebar.classList.remove("active");
    }

});