import { eProductType } from '../shared/enums/eProductType';

let fieldsToType : any = {
  'name': [eProductType.collaborativePurchase, eProductType.rent],
  'category': [eProductType.collaborativePurchase, eProductType.rent],
  'area': [eProductType.collaborativePurchase, eProductType.rent],
  'city': [eProductType.collaborativePurchase, eProductType.rent],
  'price_from': [eProductType.collaborativePurchase],
  'price_to': [eProductType.collaborativePurchase],
  'max_number_of_buyers': [eProductType.collaborativePurchase],
  'description': [eProductType.collaborativePurchase, eProductType.rent],
  'tagsControl': [eProductType.collaborativePurchase, eProductType.rent],
  'hourlyPayment': [eProductType.rent],
  'dailyPayment': [eProductType.rent]
};

export default fieldsToType;
