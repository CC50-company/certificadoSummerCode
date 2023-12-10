import axios, { AxiosResponse } from 'axios';
import { PersonStatus } from '../../api/src/modules/certificate-generator/entities/status.enum'

const apiUrlBase = 'http://127.0.0.1:5001/certificadoscc50/us-central1/api/certificate';
const apiUrlGenerateCertificate = apiUrlBase;
const apiUrlCheckStatus = apiUrlBase + '/status';
const apiUrlGetCertificateIdByEmail = apiUrlBase + "/id";
const apiUrlGetCertificateById = apiUrlBase;


function mountCertificatePath(certificateId: string): string {
    return apiUrlGetCertificateById + "/" + certificateId + ".pdf";
}

function mountStatusUrl(email: string): string {
  return apiUrlCheckStatus + "?email=" + email;
}

function mountGetCertificateUrl(email: string): string {
  return apiUrlGetCertificateIdByEmail + "?email=" + email;
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

export async function getCertificate(email: string): Promise<string> {
  let certificatePath: string = '';
  try {
    const response: AxiosResponse<string> = await axios.get(mountGetCertificateUrl(email));
    const certificateId = response.data;
    console.log('API Response:', certificateId);
    certificatePath = mountCertificatePath(certificateId);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return certificatePath;
};

export async function checkPersonStatus(email: string): Promise<PersonStatus> {
  let personStatus: PersonStatus = PersonStatus.FORBIDDEN;
  try {
    const response: AxiosResponse<PersonStatus> = await axios.get(mountStatusUrl(email));
    personStatus = response.data;
    console.log('API Response:', personStatus);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return personStatus;
};
