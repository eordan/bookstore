import React from 'react';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './About.scss';

const teamMembers = [
  {
    name: 'Alina Radjukevich',
    role: 'Student',
    bio: 'Passionate web developer with a love for creating user-friendly interfaces.',
    githubLink: 'https://github.com/Linyshka',
    photoUrl: 'alina-radjukevich-photo.jpg',
  },
  {
    name: 'Natasha',
    role: 'Developer',
    bio: 'Experienced in crafting visually appealing and intuitive user interfaces.',
    githubLink: 'https://github.com/',
    photoUrl: 'jane-smith-photo.jpg',
  },
  {
    name: 'Andrew Pistsou',
    role: 'Developer',
    bio: 'Experienced in crafting visually appealing and intuitive user interfaces.',
    githubLink: 'https://github.com/',
    photoUrl: 'jane-smith-photo.jpg',
  },
];

const collaborationDetails = {
  aboutOurTeam:
    'Our dynamic team of dedicated web developers collaborated seamlessly to bring this project to life. Each team member brought a unique set of skills and perspectives, contributing to the success of the final project.',
  teamCollaborationOne:
    "From the project's inception, we recognized the importance of effective communication and a structured workflow. We established regular meetings to discuss goals, share ideas, and outline tasks. By leveraging version control systems like Git, we ensured a smooth development process, allowing us to work concurrently on different aspects of the project.",
  teamCollaborationTwo:
    "Our collaboration extended beyond just code. We collectively brainstormed the project's design, user interface, and user experience, ensuring that it met both functional and aesthetic standards. Through rigorous code reviews and testing, we maintained a high-quality standard, identifying and addressing issues promptly.",
  result:
    'Through our cohesive teamwork, we successfully delivered a front-end project that not only met the course requirements but also showcased our commitment to collaboration, problem-solving, and innovation. We are proud of what we have achieved as a team and look forward to future opportunities to work together on exciting web development projects.',
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

      <div className="row collaboration">
        <h2 className="mt-4">About Our Team</h2>
        <p>{collaborationDetails.aboutOurTeam}</p>
        <h2 className="mt-4">Team Collaboration</h2>
        <p>{collaborationDetails.teamCollaborationOne}</p>
        <p>{collaborationDetails.teamCollaborationTwo}</p>
        <h2 className="mt-4">Result</h2>
        <p>{collaborationDetails.result}</p>
      </div>

      <div className="row team-members">
        <h2 className="mt-4">Team Members</h2>
        <ul className="list-unstyled">
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

      <div className="row rs-school-logo mt-4">
        <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
          <img src="rs-school-logo.png" alt="RS School" width="200" height="200" />
        </a>
      </div>
    </div>
  );
}
