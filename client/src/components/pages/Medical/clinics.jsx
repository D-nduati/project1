import React from 'react';
import Navbarmain from '../../NavbarMain/Navbarmain'
import Footer from '../footer/Footer';
const Clinic = () => {
  const prenatalTestData = [
    {
      name: 'Infectious disease screen',
      typeOfTest: 'Blood test',
      checkFor: 'Immunity to infections such as hepatitis, HIV and rubella',
      whenDone: 'First antenatal visit',
    },
    {
      name: 'Blood group + antibodies',
      typeOfTest: 'Blood test',
      checkFor: 'Blood group',
      whenDone: 'First antenatal visit',
    },
    {
      name: 'Full blood count',
      typeOfTest: 'Blood test',
      checkFor: 'Anaemia',
      whenDone: 'First antenatal visit',
    },
    {
      name: 'Vitamin D level',
      typeOfTest: 'Blood test',
      checkFor: 'Vitamin D deficiency',
      whenDone: 'First antenatal visit',
    },
    {
      name: 'Urine culture',
      typeOfTest: 'Urine test',
      checkFor: 'Infection',
      whenDone: 'First antenatal visit (may be repeated during pregnancy)',
    },
    {
      name: 'Dating scan',
      typeOfTest: 'Ultrasound scan',
      checkFor: 'Estimated due date',
      whenDone: '8 – 14 weeks',
    },
    {
      name: 'Nuchal translucency test',
      typeOfTest: 'Ultrasound scan',
      checkFor: 'Screens for genetic abnormalities',
      whenDone: '11 – 13 weeks',
    },
    {
      name: 'Combined first-trimester screen (CFTS)',
      typeOfTest: 'Ultrasound scan + blood test',
      checkFor: 'Screens for genetic abnormalities',
      whenDone: '11 – 14 weeks',
    },
    {
      name: 'Non-invasive prenatal testing (NIPT)',
      typeOfTest: 'Blood test',
      checkFor: 'Screens for genetic abnormalities',
      whenDone: 'From 10 weeks',
    },
    {
      name: 'Chorionic villus sampling (CVS)',
      typeOfTest: 'Procedure',
      checkFor: 'Diagnoses genetic abnormalities',
      whenDone: 'From 11 weeks',
    },
    {
      name: 'Amniocentesis',
      typeOfTest: 'Procedure',
      checkFor: 'Diagnoses genetic abnormalities',
      whenDone: 'From 15 weeks',
    },
    {
      name: 'Morphology scan',
      typeOfTest: 'Ultrasound scan',
      checkFor: 'Fetal growth and development, Position of the placenta',
      whenDone: '18 – 20 weeks',
    },
    {
      name: 'Gestational diabetes screening',
      typeOfTest: 'Blood test',
      checkFor: 'Gestational diabetes',
      whenDone: '24 – 28 weeks',
    },
    {
      name: 'Group B strep screen',
      typeOfTest: 'Vaginal-rectal swab',
      checkFor: 'Group B strep',
      whenDone: '30 – 36 weeks',
    },
  ];

  return (
    <div>
        <Navbarmain/>
      <h2>Prenatal Tests</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type of Test</th>
            <th>What Does it Check For?</th>
            <th>When is it Done?</th>
          </tr>
        </thead>
        <tbody>
          {prenatalTestData.map((test, index) => (
            <tr key={index}>
              <td>{test.name}</td>
              <td>{test.typeOfTest}</td>
              <td>{test.checkFor}</td>
              <td>{test.whenDone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer/>
    </div>
  );
};

export default Clinic;
