import React, { useState, useRef } from 'react';

export default function TerminalHUD({
  activeCommand,
  onExecuteCommand,
  bootState,
  onTriggerBoot,
  terminalLogs = [],
}) {
  const [typedInput, setTypedInput] = useState('');
  const [hudFeedback, setHudFeedback] = useState(null);
  const inputRef = useRef(null);

  const AVAILABLE_COMMANDS = [
    { cmd: 'run guild.exe', label: 'run guild.exe', section: 'top', hint: 'Overview' },
    { cmd: 'init systems', label: 'init systems', section: 'disciplines', hint: 'The Disciplines' },
    { cmd: 'build projects', label: 'build projects', section: 'builds', hint: 'Guild Builds' },
    { cmd: 'deploy', label: 'deploy', section: 'pipeline', hint: 'From Idea to Impact' },
    { cmd: 'scale', label: 'scale', section: 'scale', hint: 'Leadership & Architecture' },
  ];

  const handleCommandClick = (cmd, section) => {
    onExecuteCommand(cmd);
    setHudFeedback(`EXECUTING: ${cmd.toUpperCase()}`);

    if (section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const clean = typedInput.trim().toLowerCase();
    if (!clean) return;

    if (clean === 'help') {
      setHudFeedback('AVAILABLE: run guild.exe, init systems, build projects, deploy, scale, reboot, clear');
    } else if (clean === 'reboot' || clean === 'restart') {
      onTriggerBoot();
      setHudFeedback('REBOOTING WORKSTATION...');
    } else if (clean === 'clear') {
      setHudFeedback('TERMINAL BUFFER CLEARED');
    } else {
      const match = AVAILABLE_COMMANDS.find(
        (c) => c.cmd === clean || c.cmd.includes(clean)
      );
      if (match) {
        handleCommandClick(match.cmd, match.section);
      } else {
        setHudFeedback(`COMMAND NOT FOUND: "${clean}". TYPE "help" FOR LIST.`);
      }
    }

    setTypedInput('');
  };

  return (
    <div className="terminal-hud-panel" aria-label="Interactive Dev Guild Terminal Controller">
      <div className="terminal-hud-header">
        <div className="terminal-status-indicator">
          <span className={`status-dot ${bootState === 'booting' ? 'is-booting' : 'is-ready'}`} />
          <span className="status-text">
            {bootState === 'booting'
              ? 'BIOS BOOTING...'
              : bootState === 'standby'
              ? 'STANDBY'
              : 'TTY1 · 9600 BAUD · READY'}
          </span>
        </div>
        <div className="terminal-hud-actions">
          <button
            type="button"
            className="hud-reboot-btn"
            onClick={onTriggerBoot}
            title="Reboot CRT workstation"
          >
            <span className="reboot-icon" aria-hidden="true">↻</span>
            <span>REBOOT CRT</span>
          </button>
        </div>
      </div>

      {/* Interactive Command Buttons */}
      <div className="terminal-command-grid" role="toolbar" aria-label="Terminal Quick Commands">
        {AVAILABLE_COMMANDS.map((item) => {
          const isActive = activeCommand === item.cmd;
          return (
            <button
              key={item.cmd}
              type="button"
              className={`terminal-command-chip ${isActive ? 'is-active' : ''}`}
              onClick={() => handleCommandClick(item.cmd, item.section)}
              aria-pressed={isActive}
            >
              <span className="chip-prompt">&gt;</span>
              <span className="chip-label">{item.cmd}</span>
              <span className="chip-hint">{item.hint}</span>
            </button>
          );
        })}
      </div>

      {/* Direct Shell Input Form */}
      <form className="terminal-input-bar" onSubmit={handleInputSubmit}>
        <span className="terminal-input-prompt">FCIT@devs-guild:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={typedInput}
          onChange={(e) => setTypedInput(e.target.value)}
          placeholder="type command (e.g. init systems, deploy, help)..."
          className="terminal-shell-input"
          aria-label="Direct terminal input"
        />
        <button type="submit" className="terminal-exec-btn">
          <span>EXEC</span>
          <span aria-hidden="true">↵</span>
        </button>
      </form>

      {/* Feedback line */}
      {hudFeedback && (
        <div className="terminal-hud-feedback" role="status">
          <span className="feedback-bracket">[SYS]</span>
          <span className="feedback-msg">{hudFeedback}</span>
        </div>
      )}
    </div>
  );
}
