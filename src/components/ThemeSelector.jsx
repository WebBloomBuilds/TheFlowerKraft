import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Check, Sparkles } from 'lucide-react';
import './ThemeSelector.css';

/**
 * Temporary Colour-Theme Selector
 * Seven curated palettes available for previewing.
 * Will be removed once the client confirms their approved theme.
 */
export default function ThemeSelector() {
  const { currentTheme, selectTheme, themes } = useTheme();

  return (
    <aside className="theme-selector-bar" aria-label="Brand Colour Palette Demo Selector">
      <div className="container theme-selector-inner">
        <div className="theme-selector-meta">
          <div className="theme-tag">
            <Palette size={13} className="theme-tag-icon" />
            <span className="theme-tag-text">7 Colour Palettes</span>
          </div>
          <span className="theme-selector-hint">
            Preview TheFlowerKart in seven curated colour stories:
          </span>
        </div>

        <div className="theme-buttons-track" role="radiogroup" aria-label="Choose color palette">
          {themes.map((theme) => {
            const isActive = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => selectTheme(theme.id)}
                className={`theme-btn ${isActive ? 'is-active' : ''}`}
                title={theme.subtitle}
              >
                {/* Visual colour swatch dots */}
                <span className="swatch-dots" aria-hidden="true">
                  {theme.swatches.map((color, idx) => (
                    <span
                      key={idx}
                      className="swatch-dot"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </span>

                <span className="theme-name">{theme.name}</span>

                {theme.isDefault && !isActive && (
                  <span className="theme-badge-default" title="Extracted from reference logo">Logo</span>
                )}

                {isActive && (
                  <span className="active-check-badge">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
