export interface IContractorForm {
  companyName: string;
  name: string;
  contractorPhone: string;
  email: string;
  extraError?: string;
}

export interface IContractor {
  uid?: string;
  companyName: string;
  name: string;
  email: string;
}
