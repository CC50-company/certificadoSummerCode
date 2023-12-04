import axios, { AxiosResponse } from 'axios';

const apiUrlBase = 'http://localhost:3000/certificate';
const apiUrlGenerateCertificate = apiUrlBase;
const apiUrlCheckStatus = apiUrlBase + '/status';
const apiUrlGetCertificateByEmail = apiUrlBase;
const apiUrlGetCertificateById = apiUrlBase;

interface PersonStatus {
  isAllowed: boolean;
  isRegistered: boolean;
}


function mountCertificatePath(certificateId: string): string {
    return apiUrlGetCertificateById + "/" + certificateId + ".pdf";
}

function mountStatusPath(person: Person): string {
  return apiUrlCheckStatus + "?email=" + person.email;
}


export async function generateCertificate(person: Person): Promise<string> {
  let certificatePath: string = '';
  try {
    const response: AxiosResponse<string> = await axios.post(
      apiUrlGenerateCertificate, person,
      { headers: {'Content-Type': 'application/json'} }
    );
    const certificateId = response.data;
    console.log('API Response:', certificateId);
    certificatePath = mountCertificatePath(certificateId);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return certificatePath;
};

export async function checkPersonStatus(person: Person): Promise<PersonStatus> {
  let personStatus: PersonStatus = {
    isAllowed: false,
    isRegistered: false,
  };
  try {
    const response: AxiosResponse<number> = await axios.get(mountStatusPath(person));
    const personStatusEnum = response.data;
    console.log('API Response:', personStatusEnum);
    personStatus.isAllowed = !(personStatusEnum == 0);
    personStatus.isRegistered = (personStatusEnum == 2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return personStatus;
};
