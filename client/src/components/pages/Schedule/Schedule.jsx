import React from 'react';
import Navbarmain from '../../NavbarMain/Navbarmain';
import immunizationData from './immunizationData.json'

const Schedule = () => {
  
  const lessThanOneYearData = immunizationData.filter((data) => data.schedule.includes("Months") || data.schedule.includes("Birth"));

  const aboveOneYearData = immunizationData.filter((data) => !data.schedule.includes("Months") && !data.schedule.includes("Birth"));

  const renderTable = (data, title) => (
    <div key={title} className='schedule
    '>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #dddddd' }}>Immunization</th>
            <th style={{ padding: '10px', border: '1px solid #dddddd' }}>Schedule</th>
            <th style={{ padding: '10px', border: '1px solid #dddddd' }}>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((immunization, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #dddddd' }}>{immunization.name}</td>
              <td style={{ padding: '10px', border: '1px solid #dddddd' }}>{immunization.schedule}</td>
              <td style={{ padding: '10px', border: '1px solid #dddddd' }}>{immunization.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <Navbarmain/>
      {renderTable(lessThanOneYearData, 'Immunizations category one')}
      {renderTable(aboveOneYearData, 'Immunizations category two')}
      
    </div>
  );
};

export default Schedule;

