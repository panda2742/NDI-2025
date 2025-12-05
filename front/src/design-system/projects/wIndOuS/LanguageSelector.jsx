import { useState } from 'react'

    function LanguageSelector() {
        const [selectedLanguage, setSelectedLanguage] = useState("");
        
        const languages = [
            "British tongue",
            "English language",
            "Standard English",
            "The tongue of Shakespeare",
        ];
        
        return (
            <div>
            <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer'
                }}
            >
                <option value="">English</option>
                {languages.map((lang, index) => (
                <option key={index} value={lang}>
                    {lang}
                </option>
                ))}
            </select>
            </div>
        );
    }

export default LanguageSelector
