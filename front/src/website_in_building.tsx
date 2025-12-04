import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const MobileView: React.FC = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success(`Inscription réussie !`);

        setEmail('');
    };

    return (
        <div style={styles_container}>
            <div style={styles_overlay}>
                <div style={styles_messageBox}>
                    <h1 style={styles_title}>Site en construction</h1>
                    <p style={styles_description}>
                        Nous travaillons actuellement sur ce site. Il sera bientôt disponible sur iPhone et iPad.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email-input">Entrez votre email pour être notifié !</label>
                        <input
                            type="email"
                            placeholder="petitromeo74@gmail.com"
                            name={'email-input'}
                            id={'input-email-inscription'}
                            value={email}
                            onChange={handleEmailChange}
                            style={styles_input}
                            required
                        />
                        <button type="submit" style={styles_button}>
                            S'inscrire
                        </button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

const styles_overlay: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#282828',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
};

const styles_container: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
    color: '#fff',
};

const styles_messageBox: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const styles_title: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '15px',
};

const styles_description: React.CSSProperties = {
    fontSize: '16px',
    marginBottom: '25px',
    color: '#ddd'
};

const styles_input: React.CSSProperties = {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
};

const styles_button: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007aff',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default MobileView;
