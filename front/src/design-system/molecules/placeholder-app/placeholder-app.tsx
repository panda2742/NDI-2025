import "./style.scss";

interface PlaceholderAppProps {
    appName: string;
    iconKey?: string;
}

export const PlaceholderApp = ({ appName, iconKey }: PlaceholderAppProps) => {
    return (
        <div className="placeholder-app">
            <div className="placeholder-app-hero">
                <div className="placeholder-app-icon">
                    {iconKey ? (
                        <span className="icon-text">{iconKey.charAt(0).toUpperCase()}</span>
                    ) : (
                        <span className="icon-text">{appName.charAt(0)}</span>
                    )}
                </div>
                <h1>{appName}</h1>
            </div>
            <div className="placeholder-app-content">
                <p className="placeholder-description">
                    Cette application est un placeholder de démonstration.
                </p>
                <div className="placeholder-features">
                    <div className="feature-item">
                        <div className="feature-icon">✨</div>
                        <div className="feature-text">Interface moderne</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">⚡</div>
                        <div className="feature-text">Performance optimale</div>
                    </div>
                    <div className="feature-item">
                        <div className="feature-icon">🎨</div>
                        <div className="feature-text">Design élégant</div>
                    </div>
                </div>
                <div className="placeholder-info">
                    <p>
                        Vous pouvez fermer cette fenêtre en cliquant sur le bouton de fermeture
                        ou la minimiser en cliquant sur le bouton de minimisation.
                    </p>
                </div>
            </div>
        </div>
    );
};
