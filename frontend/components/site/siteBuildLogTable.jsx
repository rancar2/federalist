import React from 'react';
import PropTypes from 'prop-types';

function SiteBuildLogTable({ buildLogs }) {
  return (
    <table className="usa-table-borderless log-table log-table__site-build-log">
      <thead>
        <tr>
          <th>Source</th>
          <th>Output</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {buildLogs.map((log => (
          <tr key={log.id}>
            <td>{log.source}</td>
            <td>
              <pre>
                {log.output}
              </pre>
            </td>
            <td>{log.createdAt}</td>
          </tr>
        )))}
      </tbody>
    </table>
  );
}


SiteBuildLogTable.propTypes = {
  buildLogs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
};

export default SiteBuildLogTable;
