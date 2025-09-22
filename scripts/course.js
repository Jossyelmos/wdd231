const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const buttons = document.querySelectorAll("button");
const courseList = document.querySelector("#courses");
const credits = document.querySelector("#credits");
const courseDetails = document.querySelector("#course-details");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-target");
        courseList.innerHTML = "";
        let totalCreditsReq = 0;

        if (targetId === "courses") {
            courses.forEach(course => displayCourseList(course));
            totalCreditsReq = courses.reduce((acc, course) => acc + course.credits, 0);
        } else if (targetId === "wCourses") {
            const filter1 = courses.filter(course => course.subject.charAt(0) === "W");
            filter1.forEach(course => displayCourseList(course));
            totalCreditsReq = filter1.reduce((acc, course) => acc + course.credits, 0);
        } else if (targetId === "cCourses") {
            const filter2 = courses.filter(course => course.subject.charAt(0) === "C");
            filter2.forEach(course => displayCourseList(course));
            totalCreditsReq = filter2.reduce((acc, course) => acc + course.credits, 0);
        }

        credits.textContent = `The total number of course listed below is ${totalCreditsReq}`;
    })
})

function displayCourseList(course) {
    const cList = document.createElement("li");
    cList.setAttribute("data-index", courses.indexOf(course));
    cList.textContent = `${course.subject} ${course.number}`;
    if (course.completed) {
        cList.classList.add("completed");
    }
    courseList.appendChild(cList);
}

courses.forEach(course => displayCourseList(course));



function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits</strong>: ${course.credits}</p>
      <p><strong>Certificate</strong>: ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;
    const closeModal = document.querySelector("#closeModal");
    courseDetails.showModal();
    
    closeModal.addEventListener("click", () => {
      courseDetails.close();
    });
  };

  courseList.addEventListener('click', (e) => {
    const index = e.target.getAttribute("data-index");
    if (index !== null) {
        displayCourseDetails(courses[index]);
    }
  });