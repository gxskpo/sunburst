import styles from "./Home.module.css";

export default function ComparisonTable() {
    return (
        <table className={styles.comparisonTable}>
            <thead className={styles.comparisonTableHead}>
            <tr>
                <th className={styles.comparisonTableHeadCell}>Característica</th>
                <th className={styles.comparisonTableHeadCell}>Fembot</th>
                <th className={styles.comparisonTableHeadCell}>Nekotina</th>
                <th className={styles.comparisonTableHeadCell}>Dyno</th>
                <th className={styles.comparisonTableHeadCell}>MEE6</th>
            </tr>
            </thead>
            <tbody className="text-center">
            <tr className="text-center">
                <td className={styles.comparisonTableRow}>Comandos personalizados</td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-times"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-money-bill"/></td>
            </tr>
            <tr className="text-center">
                <td className={styles.comparisonTableRow}>Dashboard</td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-times"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
            </tr>
            <tr className="text-center">
                <td className={styles.comparisonTableRow}>Giveaways</td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-money-bill"/></td>
            </tr>
            <tr className="text-center">
                <td className={styles.comparisonTableRow}>Tickets</td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-times"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-check"/></td>
                <td className={styles.comparisonTableRow}><i className="fas fa-money-bill"/></td>
            </tr>
            </tbody>
        </table>
    )
}