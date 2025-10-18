import React, { useState, useEffect, useRef } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";

export default function Editor({value, setValue}) {

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Custom heading dropdown
  const headingDropdown = {
    name: "headings",
    keyCommand: "headings",
    render: (command, disabled, executeCommand) => (
      <div ref={buttonRef} style={{ position: "relative", display: "inline-block" }}>
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            background: showDropdown ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '5px',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s ease',
            color: showDropdown ? '#3b82f6' : '#e5e7eb',
            fontWeight: 600
          }}
        >
          <span style={{ fontSize: "0.8rem" }}>H</span>
          <span style={{
            transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
            display: 'inline-block',
            transition: 'transform 0.2s ease',
            fontSize: '0.6rem'
          }}>
            ▼
          </span>
        </button>

        {showDropdown && (
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              left: 0,
              background: '#1f2937', // dark background
              border: '1px solid #374151', // dark border
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              zIndex: 1000,
              minWidth: '150px',
              padding: '6px 0'
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => {
                  executeCommand({
                    execute: (state, api) => {
                      api.replaceSelection('#'.repeat(level) + ' ');
                    }
                  });
                  setShowDropdown(false);
                }}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '14px',
                  transition: 'all 0.15s ease',
                  color: '#f9fafb',
                }}
                onMouseEnter={(e) => e.target.style.background = '#374151'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <div style={{
                  fontWeight: '700',
                  color: `hsl(${220 - level * 12}, 70%, 60%)`,
                  textAlign: 'center'
                }}>Heading {level}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    ),
    execute: (state, api) => api.replaceSelection("# "), 
  };

  // Custom commands
  const customCommands = {
    bold: { ...commands.bold },
    italic: { ...commands.italic },
    code: { ...commands.code },
    link: { ...commands.link },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
      <div
        style={{ minHeight: '400px' }}
      >
        <MDEditor
          value={value}
          onChange={setValue}
          preview="edit"
          height="100%"
          visibleDragbar={false}
          commands={[
            headingDropdown,
            customCommands.bold,
            customCommands.italic,
            commands.strikethrough,
            commands.hr,
            commands.divider,
            customCommands.link,
            commands.quote,
            customCommands.code,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          extraCommands={[]}
          style={{
            background: "#000000",
          }}
        />
      </div>
  );
}
