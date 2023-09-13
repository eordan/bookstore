import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './About.scss';

const teamMembers = [
  {
    name: 'Alina Radjukevich',
    role: 'RS School Student',
    bio: "I'm an aspiring web developer currently in my journey to mastering the world of web development. While still a student, I have a strong grasp of React, a powerful JavaScript library. My enthusiasm for coding and my ability to harness React's capabilities allow me to create dynamic and user-friendly interfaces. I'm excited to continue learning and growing in the field of web development.",
    githubLink: 'https://github.com/Linyshka',
    photoUrl: 'https://avatars.githubusercontent.com/u/92429718?v=4',
  },
  {
    name: 'Natasha',
    role: 'RS School Student',
    bio: "I am in the midst of a career change, transitioning into the dynamic field of web development. With a background in a different field, I bring a fresh perspective and a strong desire to make a meaningful impact through coding. I'm dedicated to learning the ropes of web development and creating user-friendly interfaces that stand out. My passion for this new path drives me to explore and excel.",
    githubLink: 'https://github.com/whiterabbit8',
    photoUrl: 'https://avatars.githubusercontent.com/u/32563352?v=4',
  },
  {
    name: 'Andrew Pistsou',
    role: 'Current Role: Procurement Engineer',
    bio: "I am excited to embark on a new journey in web development. My previous experiences in the field of petrochemical procurement have honed my problem-solving skills and attention to detail, which I now bring to the world of coding. While I'm relatively new to web development, I am driven by passion and determination. I am committed to acquiring the necessary skills to learn and grow in the ever-evolving field of web development.",
    githubLink: 'https://github.com/eordan',
    photoUrl: 'https://avatars.githubusercontent.com/u/88047742?v=4',
  },
];

const collaborationDetails = {
  aboutOurTeam:
    'Our dynamic team of dedicated web developers collaborated seamlessly to bring this project to life. Each team member brought a unique set of skills and perspectives, contributing to the success of the final project.',
  teamCollaborationOne:
    "From the project's inception, we recognized the importance of effective communication and a structured workflow. We established regular meetings to discuss goals, share ideas, and outline tasks. By leveraging Git version control systems, we ensured a smooth development process that allowed us to work concurrently on different aspects of the project.",
  teamCollaborationTwo:
    "Our collaboration extended beyond just code. We collectively brainstormed the project's design, user interface, and user experience, ensuring that it met both functional and aesthetic standards. Through rigorous code reviews and testing, we maintained a high-quality standard, identifying and addressing issues promptly.",
  result:
    'Through our cohesive teamwork, we successfully delivered the end result that not only met the course requirements but also showcased our commitment to collaboration, problem-solving, and innovation. We are proud of what we have achieved as a team and look forward to future opportunities to work together on new and exciting projects.',
};

export function About(): JSX.Element {
  return (
    <div className="container about-us">
      <div className="about">
        <Container className="d-flex about-container">
          <h1 className="title">Our Team</h1>
          <div className="breadcrumbs">
            <p className="breadcrumbs-main">Main&#160;&#160;&#160;&#160;&#62;</p>
            <p className="breadcrumbs-about">About</p>
          </div>
          <ToastContainer />
        </Container>
      </div>

      <div className="collaboration">
        <h2 className="mt-4">About Our Team</h2>
        <p>{collaborationDetails.aboutOurTeam}</p>
        <h2 className="mt-4">Collaboration</h2>
        <p>{collaborationDetails.teamCollaborationOne}</p>
        <p>{collaborationDetails.teamCollaborationTwo}</p>
        <h2 className="mt-4">Result</h2>
        <p>{collaborationDetails.result}</p>
      </div>

      <p className="line" />

      <div className="row team-members">
        <h2 className="mt-4">Team Members</h2>
        <ul className="bios">
          {teamMembers.map((member) => (
            <li key={member.name} className="media mt-3">
              <img src={member.photoUrl} alt={member.name} className="mr-3" width="100" height="100" />
              <div className="media-body">
                <h3 className="mt-0">{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.bio}</p>
                <a href={member.githubLink} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="line" />

      <div className="row rs-school-logo mt-4">
        <h2 className="mt-4">Learn more about RS School</h2>
        <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
          <img src="https://rs.school/images/rs_school.svg" alt="RS School" width="200" height="200" />
        </a>
      </div>
    </div>
  );
}
