import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ActivitiesPage from './pages/ActivitiesPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AchievementsPage from './pages/AchievementsPage';
import PublicationsPage from './pages/PublicationsPage';
import TeamPage from './pages/TeamPage';
import WorkingGuildsPage from './pages/WorkingGuildsPage';
import GuildDetailPage from './pages/GuildDetailPage';
import DevGuildPage from './pages/DevGuildPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import JoinPage from './pages/JoinPage';
import AnnouncementsPage from './pages/AnnouncementsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="activities" element={<ActivitiesPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="publications" element={<PublicationsPage />} />
          <Route path="working-guilds" element={<Navigate to="/guilds/dev" replace />} />
          <Route path="guilds" element={<Navigate to="/guilds/dev" replace />} />
          <Route path="guilds/dev" element={<GuildDetailPage guildId="devs-guild" />} />
          <Route path="guilds/devs-guild" element={<GuildDetailPage guildId="devs-guild" />} />
          <Route path="guilds/dev-lab" element={<DevGuildPage />} />
          <Route path="guilds/intelligence" element={<GuildDetailPage guildId="intelligence-guild" />} />
          <Route path="guilds/algocrew" element={<GuildDetailPage guildId="algocrew" />} />
          <Route path="guilds/fusion-x" element={<GuildDetailPage guildId="fusion-x" />} />
          <Route path="guilds/:slug" element={<GuildDetailPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="people" element={<Navigate to="/team" replace />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="join" element={<Navigate to="/" replace />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
