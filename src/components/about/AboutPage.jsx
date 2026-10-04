import React, { useEffect } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { ARTIST_INFO } from '../../data/artworks';
import { Sparkles, MapPin, Mail, Award, BookOpen, Briefcase, GraduationCap, Code } from 'lucide-react';
import './AboutPage.css';

export default function AboutPage() {
  const { setIsAboutOpen } = useGallery();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="about-page-container">
      {/* Header */}
      <div className="about-page-header">
        <div className="about-title-wrap">
          <Sparkles size={24} className="about-sparkle" />
          <h1>Artist Profile & Resume</h1>
        </div>
        <button 
          className="back-to-gallery-btn"
          onClick={() => setIsAboutOpen(false)}
        >
          ← Back to Gallery
        </button>
      </div>

      {/* Content */}
      <div className="about-page-body">
        {/* Profile Hero Section */}
        <div className="about-profile-hero">
          <div className="about-avatar-ring">
            <div className="about-avatar-inner">B</div>
          </div>
          <div className="about-profile-info">
            <h2 className="about-artist-name">{ARTIST_INFO.name}</h2>
            <p className="about-artist-title">{ARTIST_INFO.title}</p>
            <div className="about-location">
              <MapPin size={16} />
              <span>{ARTIST_INFO.location}</span>
            </div>
            <div className="about-contact-links">
              <div className="contact-item">
                <Mail size={16} />
                <span>{ARTIST_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-grid-layout">
          {/* Main Column */}
          <div className="about-main-col">
            {/* Bio Section */}
            <div className="about-section">
              <h3 className="section-title">
                <BookOpen size={20} /> About Me
              </h3>
              <p className="bio-text">{ARTIST_INFO.bio}</p>
            </div>

            {/* Leadership & Philosophy */}
            <div className="about-section">
              <h3 className="section-title">
                <Award size={20} /> Leadership
              </h3>
              <blockquote className="about-philosophy-quote">
                <p>{ARTIST_INFO.philosophy}</p>
              </blockquote>
            </div>

            {/* Work Experience */}
            <div className="about-section">
              <h3 className="section-title">
                <Briefcase size={20} /> Work Experience
              </h3>
              <div className="experience-list">
                {ARTIST_INFO.workExperience.map((job, idx) => (
                  <div key={idx} className="experience-item">
                    <div className="experience-header">
                      <h4>{job.title}</h4>
                      <span className="experience-date">{job.date}</span>
                    </div>
                    <div className="experience-company">{job.company}</div>
                    <p className="experience-desc">{job.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="about-section">
              <h3 className="section-title">
                <GraduationCap size={20} /> Education
              </h3>
              <div className="education-list">
                {ARTIST_INFO.education.map((edu, idx) => (
                  <div key={idx} className="education-item">
                    <span className="education-year">{edu.year}</span>
                    <span className="education-title">{edu.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="about-sidebar-col">
            {/* Skills */}
            <div className="about-section">
              <h3 className="section-title">
                <Code size={20} /> Key Skills
              </h3>
              <div className="skills-tags">
                {ARTIST_INFO.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="about-section">
              <h3 className="section-title">Languages</h3>
              <ul className="info-list">
                {ARTIST_INFO.languages.map((lang, idx) => (
                  <li key={idx}>{lang}</li>
                ))}
              </ul>
            </div>

            {/* Hobbies */}
            <div className="about-section">
              <h3 className="section-title">Hobbies</h3>
              <ul className="info-list">
                {ARTIST_INFO.hobbies.map((hobby, idx) => (
                  <li key={idx}>{hobby}</li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div className="about-section">
              <h3 className="section-title">Address</h3>
              <p className="address-text">{ARTIST_INFO.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
