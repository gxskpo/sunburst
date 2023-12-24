import styles from '../mestyles.module.css';

export function ProfileSkeleton() {
    return (
        <div className={styles.profilePictureImg + " " + styles.skeleton}></div>
    )
}

export function UsernameSkeleton() {
    // original:                        <h4 className={styles.profileUsername}>{user ? user.username : "Example"}</h4>
    return (
        <h4 className={styles.profileUsername + " " + styles.skeleton}>Example</h4>
    )
}

export function SubFieldSkeleton() {
    // original:                <div className={styles.profileValue} onClick={manageSubs}>asdasds</div>
    return (
        <div className={styles.profileValue + " " + styles.skeleton}></div>
    )
}