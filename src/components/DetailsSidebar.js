import React from 'react';
import { PROVIDER_LOGO_URL_BASE } from '../pages/DetailsPage'; 
import styles from './DetailsSidebar.module.css';

const formatCurrency = (number) => {
    if (!number) return 'N/A';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
};

// Componente helper para renderizar a seção de provedores
const ProviderList = ({ title, providersList }) => (
    <div className={styles.providerSection}>
        <h5 className={styles.providerSubtitle}>{title}:</h5>
        {providersList.map(provider => (
            <div key={provider.provider_id} className={styles.providerCard}>
                <img
                    src={`${PROVIDER_LOGO_URL_BASE}${provider.logo_path}`} 
                    alt={provider.provider_name}
                    className={styles.providerLogo}
                />
                <span className={styles.providerName}>{provider.provider_name}</span>
            </div>
        ))}
    </div>
);


/**
 * Componente que renderiza a barra lateral da página de detalhes.
 */
function DetailsSidebar({ details, providers, keywordsList }) {
    
    const streamProviders = providers?.flatrate || []; 
    const rentProviders = providers?.rent || []; 
    const buyProviders = providers?.buy || []; 
    const providersLink = providers?.link; 

    return (
        <div className={styles.sidebarContainer}>

            {/* Bloco de Provedores de Streaming */}
            {providers && (
                <div className={styles.infoBlock}>
                    <h4 className={styles.providerHeader}>Onde Assistir (BR)</h4>

                    {/* Assinatura */}
                    {streamProviders.length > 0 && (
                        <ProviderList title="Assinatura" providersList={streamProviders} />
                    )}

                    {/* Aluguel */}
                    {rentProviders.length > 0 && (
                        <ProviderList title="Alugar" providersList={rentProviders} />
                    )}

                    {/* Compra */}
                    {buyProviders.length > 0 && (
                        <ProviderList title="Comprar" providersList={buyProviders} />
                    )}

                    {/* Mensagem de fallback */}
                    {!streamProviders.length && !rentProviders.length && !buyProviders.length && (
                        <p className={styles.providerFallback}>Nenhuma opção de streaming/aluguel/compra disponível.</p>
                    )}

                    {/* Link para o TMDB */}
                    {providersLink && (
                        <p style={{ marginTop: '15px' }}>
                            <a href={providersLink} target="_blank" rel="noopener noreferrer" className={styles.providerLink}>
                                Ver todos os provedores no TMDB
                            </a>
                        </p>
                    )}
                </div>
            )}

            {/* Status */}
            <div className={styles.infoBlock}>
                <h4 className={styles.infoBlockTitle}>Status</h4>
                <p className={styles.infoBlockContent}>{details.status}</p>
            </div>

            {/* Idioma original */}
            <div className={styles.infoBlock}>
                <h4 className={styles.infoBlockTitle}>Idioma original</h4>
                <p className={styles.infoBlockContent}>{details.original_language?.toUpperCase()}</p>
            </div>

            {/* Orçamento */}
            <div className={styles.infoBlock}>
                <h4 className={styles.infoBlockTitle}>Orçamento</h4>
                <p className={styles.infoBlockContent}>{formatCurrency(details.budget)}</p>
            </div>

            {/* Receita */}
            <div className={styles.infoBlock}>
                <h4 className={styles.infoBlockTitle}>Receita</h4>
                <p className={styles.infoBlockContent}>{formatCurrency(details.revenue)}</p>
            </div>

            {/* Palavras-chave */}
            <div className={styles.infoBlock}>
                <h4 className={styles.keywordSectionTitle}>Palavras-chave</h4>
                <div>
                    {keywordsList.map(keyword => (
                        <span key={keyword.id} className={styles.keywordTag}>{keyword.name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailsSidebar;
