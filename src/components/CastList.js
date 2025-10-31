import React from 'react';
import { ACTOR_IMAGE_URL } from '../pages/DetailsPage'; 
import styles from './CastList.module.css';

/**
 * Componente que renderiza a lista horizontal do elenco principal.
 * @param {Array<Object>} cast 
 */
function CastList({ cast }) {
    if (!cast || cast.length === 0) return null;

    return (
        <section className={styles.castSection}>
            <h2 className={styles.sectionTitle}>Elenco principal</h2>
            <div className={styles.horizontalList}>
                {cast.map(person => (
                    <div key={person.id} className={styles.actorCard}>
                        <img
                            src={person.profile_path ? `${ACTOR_IMAGE_URL}${person.profile_path}` : 'https://via.placeholder.com/150x225?text=Sem+Foto'}
                            alt={person.name}
                            className={styles.actorImage}
                        />
                        <div className={styles.actorInfo}>
                            <h4 className={styles.actorName}>{person.name}</h4>
                            <p className={styles.actorCharacter}>{person.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CastList;