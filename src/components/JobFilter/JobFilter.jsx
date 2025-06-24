import styles from './JobFilter.module.css';

export default function JobFilter({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterGroup}>
        <input
          type="text"
          name="search"
          placeholder="Search jobs..."
          value={filters.search}
          onChange={handleChange}
          className={styles.searchInput}
        />
      </div>
      
      <div className={styles.filterGroup}>
        <select
          name="location"
          value={filters.location}
          onChange={handleChange}
          className={styles.selectInput}
        >
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="new york">New York</option>
          <option value="san francisco">San Francisco</option>
          <option value="london">London</option>
        </select>
      </div>
      
      <div className={styles.filterGroup}>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className={styles.selectInput}
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
      </div>
    </div>
  );
}