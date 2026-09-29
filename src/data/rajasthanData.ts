/**
 * Complete Rajasthan Administrative Data
 * All 50 Districts with their Sub-Districts, Tehsils, and Primary Healthcare Hubs
 */

export interface RajasthanTehsil {
  name: string;
  pincodePrefix: string;
  hubAreas: string[];
}

export interface RajasthanDistrict {
  id: string;
  name: string;
  hindiName: string;
  division: 'Jaipur' | 'Jodhpur' | 'Ajmer' | 'Bikaner' | 'Udaipur' | 'Kota' | 'Bharatpur' | 'Sikar' | 'Pali' | 'Banswara';
  headquarters: string;
  tehsils: RajasthanTehsil[];
}

export const RAJASTHAN_DISTRICTS: RajasthanDistrict[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    hindiName: 'जयपुर (शहरी)',
    division: 'Jaipur',
    headquarters: 'Jaipur',
    tehsils: [
      { name: 'Jaipur Urban (Central)', pincodePrefix: '302001', hubAreas: ['MI Road', 'C-Scheme', 'Civil Lines', 'Malviya Nagar', 'Raja Park', 'Bapu Nagar', 'Vaishali Nagar', 'Mansarovar', 'Jagatpura', 'Shastri Nagar', 'Vidhyadhar Nagar'] },
      { name: 'Sanganer', pincodePrefix: '302029', hubAreas: ['Sanganer Town', 'Sitapura Industrial Area', 'Pratap Nagar', 'Mahapura', 'Tonk Road Hub'] },
      { name: 'Amer', pincodePrefix: '302028', hubAreas: ['Amer Fort Area', 'Kukas', 'Delhi Highway', 'Jal Mahal Belt'] },
      { name: 'Jhotwara', pincodePrefix: '302012', hubAreas: ['Jhotwara Industrial Area', 'Kalwar Road', 'Niwaru', 'Khatipura'] }
    ]
  },
  {
    id: 'jaipur_rural',
    name: 'Jaipur Rural',
    hindiName: 'जयपुर ग्रामीण',
    division: 'Jaipur',
    headquarters: 'Jaipur',
    tehsils: [
      { name: 'Bassi', pincodePrefix: '303301', hubAreas: ['Bassi Main Market', 'Khatipura Rural', 'Kanota', 'Toonga'] },
      { name: 'Chaksu', pincodePrefix: '303901', hubAreas: ['Chaksu Mandi', 'Sheetla Mata Area', 'Kotkhawada Road', 'Shivdaspura'] },
      { name: 'Jamwa Ramgarh', pincodePrefix: '303109', hubAreas: ['Ramgarh Dam', 'Andhi', 'Tala', 'Dhaula'] },
      { name: 'Shahpura (Jaipur)', pincodePrefix: '303103', hubAreas: ['Shahpura Town', 'Bidara', 'Manoharpur'] },
      { name: 'Viratnagar', pincodePrefix: '303102', hubAreas: ['Viratnagar Bairath', 'Med', 'Bhabhru'] },
      { name: 'Kotkhawada', pincodePrefix: '303908', hubAreas: ['Kotkhawada Central', 'Garuda', 'Rupaheli'] },
      { name: 'Kishangarh Renwal', pincodePrefix: '303603', hubAreas: ['Renwal Town', 'Lala Ka Bas', 'Badhal'] },
      { name: 'Jobner', pincodePrefix: '303328', hubAreas: ['Jobner College Area', 'Asalpur', 'Bhojpura'] },
      { name: 'Sambhar Lake', pincodePrefix: '303604', hubAreas: ['Sambhar Town', 'Salt Lake Area', 'Nawa Border'] }
    ]
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    hindiName: 'जोधपुर (शहरी)',
    division: 'Jodhpur',
    headquarters: 'Jodhpur',
    tehsils: [
      { name: 'Jodhpur Urban', pincodePrefix: '342001', hubAreas: ['Sardarpura', 'Shastri Nagar', 'Ratanada', 'Paota', 'Pal Road', 'Basni Industrial Area', 'Residency Road', 'Chopasni Housing Board'] }
    ]
  },
  {
    id: 'jodhpur_rural',
    name: 'Jodhpur Rural',
    hindiName: 'जोधपुर ग्रामीण',
    division: 'Jodhpur',
    headquarters: 'Jodhpur',
    tehsils: [
      { name: 'Luni', pincodePrefix: '342802', hubAreas: ['Luni Junction', 'Salawas', 'Dhandhaniya', 'Mogra'] },
      { name: 'Bilara', pincodePrefix: '342602', hubAreas: ['Bilara Town', 'Pipar City', 'Bhavi', 'Borunda'] },
      { name: 'Bhopalgarh', pincodePrefix: '342603', hubAreas: ['Bhopalgarh Main', 'Asop', 'Rundia', 'Khangta'] },
      { name: 'Shergarh', pincodePrefix: '342022', hubAreas: ['Shergarh', 'Sai', 'Tena', 'Balesar'] },
      { name: 'Balesar', pincodePrefix: '342023', hubAreas: ['Balesar Durgawata', 'Chamu', 'Agolai'] },
      { name: 'Osian', pincodePrefix: '342303', hubAreas: ['Osian Mandi', 'Tiwari', 'Mathania Mirchi Mandi'] },
      { name: 'Baori', pincodePrefix: '342037', hubAreas: ['Baori Tehsil Hub', 'Kalanada', 'Netra'] }
    ]
  },
  {
    id: 'ajmer',
    name: 'Ajmer',
    hindiName: 'अजमेर',
    division: 'Ajmer',
    headquarters: 'Ajmer',
    tehsils: [
      { name: 'Ajmer Urban', pincodePrefix: '305001', hubAreas: ['Civil Lines', 'Vaishali Nagar', 'Clock Tower', 'Makhupura Industrial Area', 'Adarsh Nagar', 'Kaiser Ganj'] },
      { name: 'Pushkar', pincodePrefix: '305022', hubAreas: ['Pushkar Lake', 'Brahma Temple Area', 'Ganahera', 'Motisar'] },
      { name: 'Kishangarh', pincodePrefix: '305801', hubAreas: ['Marble Slurry Area', 'Madanganj Mandi', 'Harmara', 'Silora Industrial Area'] },
      { name: 'Nasirabad', pincodePrefix: '305601', hubAreas: ['Cantonment Hub', 'Derathu', 'Srinagar (Ajmer)', 'Danta'] },
      { name: 'Peesangan', pincodePrefix: '305204', hubAreas: ['Peesangan Town', 'Govindgarh', 'Budha Pushkar'] }
    ]
  },
  {
    id: 'alwar',
    name: 'Alwar',
    hindiName: 'अलवर',
    division: 'Jaipur',
    headquarters: 'Alwar',
    tehsils: [
      { name: 'Alwar Urban', pincodePrefix: '301001', hubAreas: ['MIA Industrial Area', 'Scheme No 8', 'Company Bagh', 'Malviya Nagar Alwar', 'Kala Kuan'] },
      { name: 'Rajgarh (Alwar)', pincodePrefix: '301408', hubAreas: ['Rajgarh Fort Area', 'Machari', 'Tehla'] },
      { name: 'Ramgarh', pincodePrefix: '301026', hubAreas: ['Ramgarh Town', 'Naugaon', 'Bamboli'] },
      { name: 'Thanagazi', pincodePrefix: '301022', hubAreas: ['Thanagazi Main', 'Pratapgarh (Alwar)', 'Ajabgarh'] },
      { name: 'Laxmangarh (Alwar)', pincodePrefix: '301607', hubAreas: ['Laxmangarh Town', 'Badodameo', 'Govindgarh Alwar'] }
    ]
  },
  {
    id: 'bikaner',
    name: 'Bikaner',
    hindiName: 'बीकानेर',
    division: 'Bikaner',
    headquarters: 'Bikaner',
    tehsils: [
      { name: 'Bikaner Urban', pincodePrefix: '334001', hubAreas: ['Kote Gate', 'Rani Bazar', 'Jayanarayan Vyas Colony', 'Sadul Colony', 'Bichhwal Industrial Area'] },
      { name: 'Nokha', pincodePrefix: '334803', hubAreas: ['Nokha Mandi', 'Mukam Peeth', 'Jasrasar', 'Bhamatsar'] },
      { name: 'Dungargarh (Sri Dungargarh)', pincodePrefix: '331803', hubAreas: ['Dungargarh Town', 'Upni', 'Momasar'] },
      { name: 'Lunkaransar', pincodePrefix: '334603', hubAreas: ['Lunkaransar Salt Hub', 'Kalu', 'Dhirera'] },
      { name: 'Kolayat', pincodePrefix: '334302', hubAreas: ['Kapil Muni Sarovar', 'Bajju', 'Diyatra', 'Hada'] },
      { name: 'Khajuwala', pincodePrefix: '334023', hubAreas: ['Khajuwala Mandi', 'Danthoor', 'Kudan'] },
      { name: 'Chhatargarh', pincodePrefix: '334021', hubAreas: ['Chhatargarh Main', 'Moti Ka Kua', 'Satta'] }
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    hindiName: 'उदयपुर',
    division: 'Udaipur',
    headquarters: 'Udaipur',
    tehsils: [
      { name: 'Girwa (Udaipur Urban)', pincodePrefix: '313001', hubAreas: ['Fatehpura', 'Chetak Circle', 'Sukher Marble Hub', 'Hiran Magri Sector 3-14', 'Goverdhan Vilas', 'Bhuwana', 'Madri Industrial Area'] },
      { name: 'Badgaon', pincodePrefix: '313011', hubAreas: ['Badgaon Village', 'Kailashpuri', 'Iswal'] },
      { name: 'Mavli', pincodePrefix: '313203', hubAreas: ['Mavli Junction', 'Sanwar', 'Ghasa', 'Fatehnagar Mandi'] },
      { name: 'Vallabhnagar', pincodePrefix: '313601', hubAreas: ['Vallabhnagar Town', 'Dungla Road', 'Kanor', 'Bhindar'] },
      { name: 'Gogunda', pincodePrefix: '313705', hubAreas: ['Gogunda Town', 'Pindwara Highway', 'Modi'] },
      { name: 'Kherwara', pincodePrefix: '313803', hubAreas: ['Kherwara Cantt', 'Bawalwada', 'Chani'] },
      { name: 'Kotra', pincodePrefix: '307025', hubAreas: ['Kotra Tribal Hub', 'Mamer', 'Jhadol Border'] },
      { name: 'Jhadol', pincodePrefix: '313702', hubAreas: ['Jhadol Phalasia', 'Gorana', 'Bagpura'] },
      { name: 'Rishabhdeo', pincodePrefix: '313802', hubAreas: ['Kesariyaji Mandir', 'Kalyanpur', 'Paderu'] }
    ]
  },
  {
    id: 'kota',
    name: 'Kota',
    hindiName: 'कोटा',
    division: 'Kota',
    headquarters: 'Kota',
    tehsils: [
      { name: 'Ladpura (Kota Urban)', pincodePrefix: '324001', hubAreas: ['Talwandi Coaching Hub', 'Vigyan Nagar', 'Mahaveer Nagar 1-3', 'Dadabari', 'Gumanpura', 'Indraprastha Industrial Area', 'Kunhari'] },
      { name: 'Digod', pincodePrefix: '325201', hubAreas: ['Digod Mandi', 'Sultanpur Kota', 'Bada'] },
      { name: 'Sangod', pincodePrefix: '325601', hubAreas: ['Sangod Town', 'Bapawar Kalan', 'Kanwas Road'] },
      { name: 'Ramganj Mandi', pincodePrefix: '326519', hubAreas: ['Kota Stone Mandi', 'Chechat', 'Kukra', 'Modak'] },
      { name: 'Pipalda', pincodePrefix: '325003', hubAreas: ['Itawa Mandi', 'Khatoli', 'Ayana'] },
      { name: 'Kanwas', pincodePrefix: '325602', hubAreas: ['Kanwas Town', 'Dhulet', 'Mora'] }
    ]
  },
  {
    id: 'sikar',
    name: 'Sikar',
    hindiName: 'सीकर',
    division: 'Sikar',
    headquarters: 'Sikar',
    tehsils: [
      { name: 'Sikar Urban', pincodePrefix: '332001', hubAreas: ['Piprali Road Coaching Zone', 'Station Road', 'Fatehpur Road', 'Bajaj Road', 'Radhakishan Pura', 'Sanwali'] },
      { name: 'Fatehpur Shekhawati', pincodePrefix: '332301', hubAreas: ['Fatehpur Mandi', 'Beswa', 'Dhanani'] },
      { name: 'Laxmangarh (Sikar)', pincodePrefix: '332311', hubAreas: ['Laxmangarh Town', 'Modi University Belt', 'Nechhwa', 'Jasrasar'] },
      { name: 'Danta Ramgarh', pincodePrefix: '332703', hubAreas: ['Danta', 'Ramgarh Shekhawati', 'Khatoo Shyamji Dham', 'Bay'] },
      { name: 'Dhod', pincodePrefix: '332002', hubAreas: ['Dhod Town', 'Seva', 'Bidsar'] }
    ]
  },
  {
    id: 'jhunjhunu',
    name: 'Jhunjhunu',
    hindiName: 'झुंझुनू',
    division: 'Sikar',
    headquarters: 'Jhunjhunu',
    tehsils: [
      { name: 'Jhunjhunu Urban', pincodePrefix: '333001', hubAreas: ['Mandawa Mod', 'Peeru Singh Circle', 'RIICO Industrial Area', 'Baggar Road'] },
      { name: 'Chirawa', pincodePrefix: '333026', hubAreas: ['Chirawa Peda Mandi', 'Pilani BITS Hub', 'Mandrella', 'Surajgarh'] },
      { name: 'Nawalgarh', pincodePrefix: '333042', hubAreas: ['Nawalgarh Haveli Hub', 'Mukundgarh', 'Dundlod'] },
      { name: 'Buhana', pincodePrefix: '333515', hubAreas: ['Buhana Main', 'Pacheri Bari', 'Singhala'] },
      { name: 'Khetri', pincodePrefix: '333503', hubAreas: ['Khetri Nagar Copper Complex', 'Babai', 'Gothra'] },
      { name: 'Udaipurwati', pincodePrefix: '333307', hubAreas: ['Udaipurwati Town', 'Gura Ponkh', 'Shakambhari Road'] }
    ]
  },
  {
    id: 'churu',
    name: 'Churu',
    hindiName: 'चूरू',
    division: 'Bikaner',
    headquarters: 'Churu',
    tehsils: [
      { name: 'Churu Urban', pincodePrefix: '331001', hubAreas: ['Naya Bass', 'Railway Station Road', 'RIICO Churu', 'Dharmastupa'] },
      { name: 'Ratangarh', pincodePrefix: '331022', hubAreas: ['Ratangarh Junction', 'Parihara', 'Rajaldesar'] },
      { name: 'Sardarshahar', pincodePrefix: '331403', hubAreas: ['Gandhi Vidya Mandir', 'Tal Maidan', 'Bhanipura'] },
      { name: 'Sujangarh', pincodePrefix: '331507', hubAreas: ['Salasar Balaji Dham Hub', 'Chhapar Deer Sanctuary', 'Gopalpura'] },
      { name: 'Rajgarh (Sadulpur)', pincodePrefix: '331023', hubAreas: ['Sadulpur Junction', 'Hamirwas', 'Sankhu'] },
      { name: 'Taranagar', pincodePrefix: '331304', hubAreas: ['Taranagar Mandi', 'Sahawa', 'Bhani'] },
      { name: 'Bidasar', pincodePrefix: '331501', hubAreas: ['Bidasar Town', 'Dhaner', 'Lalsar'] }
    ]
  },
  {
    id: 'nagaur',
    name: 'Nagaur',
    hindiName: 'नागौर',
    division: 'Ajmer',
    headquarters: 'Nagaur',
    tehsils: [
      { name: 'Nagaur Urban', pincodePrefix: '341001', hubAreas: ['Bassi Road', 'Fort Area', 'Karni Industrial Area', 'Garda Colony'] },
      { name: 'Jayal', pincodePrefix: '341023', hubAreas: ['Jayal Mandi', 'Deh', 'Tarnau'] },
      { name: 'Ladnun', pincodePrefix: '341306', hubAreas: ['Jain Vishva Bharati Hub', 'Jaswantgarh', 'Sunari'] },
      { name: 'Merta City', pincodePrefix: '341510', hubAreas: ['Mira Bai Dham', 'Merta Road Junction', 'Riyan Badi', 'Ren'] },
      { name: 'Degana', pincodePrefix: '341503', hubAreas: ['Tungsten Reserve Hub', 'Degana Junction', 'Langod'] },
      { name: 'Khinvsar', pincodePrefix: '341025', hubAreas: ['Khinvsar Fort Belt', 'Panchla', 'Nagri'] }
    ]
  },
  {
    id: 'didwana_kuchaman',
    name: 'Didwana-Kuchaman',
    hindiName: 'डीडवाना-कुचामन',
    division: 'Ajmer',
    headquarters: 'Didwana',
    tehsils: [
      { name: 'Didwana', pincodePrefix: '341303', hubAreas: ['Didwana Salt Lake', 'Bangar Hospital Road', 'Molasar', 'Chhoti Khatu'] },
      { name: 'Kuchaman City', pincodePrefix: '341508', hubAreas: ['Kuchaman Education City Hub', 'Station Road', 'Palasari'] },
      { name: 'Makrana', pincodePrefix: '341505', hubAreas: ['White Marble Mandi', 'Gunasoli', 'Borawar', 'Bhudsu'] },
      { name: 'Parbatsar', pincodePrefix: '341512', hubAreas: ['Parbatsar Cattle Fair Hub', 'Bidiyad', 'Kishangarh Border'] },
      { name: 'Nawa', pincodePrefix: '341509', hubAreas: ['Salt Testing Area', 'Maroth', 'Mithri'] }
    ]
  },
  {
    id: 'pali',
    name: 'Pali',
    hindiName: 'पाली',
    division: 'Pali',
    headquarters: 'Pali',
    tehsils: [
      { name: 'Pali Urban', pincodePrefix: '306401', hubAreas: ['Mandia Road Industrial Area', 'Surajpole', 'Tagore Nagar', 'Panchetiya'] },
      { name: 'Sumerpur', pincodePrefix: '306902', hubAreas: ['Sumerpur Ghee Mandi', 'Jawad Dam Belt', 'Sheoganj Border'] },
      { name: 'Sojat', pincodePrefix: '306104', hubAreas: ['Sojat Mehandi Mandi', 'Sojat Road Junction', 'Bagri'] },
      { name: 'Bali', pincodePrefix: '306701', hubAreas: ['Bali Town', 'Boyal', 'Falna Station (Umbrella Hub)', 'Sadri'] },
      { name: 'Desuri', pincodePrefix: '306703', hubAreas: ['Desuri Ghat', 'Ranakpur Jain Mandir Belt', 'Ghanerao'] },
      { name: 'Jaitaran', pincodePrefix: '306302', hubAreas: ['Jaitaran Mandi', 'Nimaj', 'Giri Sumel'] },
      { name: 'Marwar Junction', pincodePrefix: '306001', hubAreas: ['Railway Junction Area', 'Ranawas', 'Kharchi'] },
      { name: 'Rohat', pincodePrefix: '306421', hubAreas: ['Rohat Town', 'Garwara', 'Chotila Bullet Baba Belt'] }
    ]
  },
  {
    id: 'barmer',
    name: 'Barmer',
    hindiName: 'बाड़मेर',
    division: 'Jodhpur',
    headquarters: 'Barmer',
    tehsils: [
      { name: 'Barmer Urban', pincodePrefix: '344001', hubAreas: ['Oilfield Hub', 'Uttarlai', 'Mahabar Road', 'Kisan Hostel Area'] },
      { name: 'Chohtan', pincodePrefix: '344702', hubAreas: ['Chohtan Mata Dham', 'Sedwa', 'Dhanau'] },
      { name: 'Gudamalani', pincodePrefix: '344031', hubAreas: ['Cairn Oil Processing Area', 'Sindhari Border', 'Naya Nagar'] },
      { name: 'Baytoo', pincodePrefix: '344034', hubAreas: ['Baytoo Junction', 'Panji Ka Tala', 'Kalu Ka Tala'] },
      { name: 'Sheo', pincodePrefix: '344701', hubAreas: ['Sheo Town', 'Harsani', 'Gunga'] },
      { name: 'Ramsar', pincodePrefix: '344002', hubAreas: ['Ramsar Town', 'Gadra Road Border', 'Sundra'] }
    ]
  },
  {
    id: 'balotra',
    name: 'Balotra',
    hindiName: 'बालोतरा',
    division: 'Jodhpur',
    headquarters: 'Balotra',
    tehsils: [
      { name: 'Balotra Urban', pincodePrefix: '344022', hubAreas: ['Textile Processing Hub', 'Jasol Majisa Dham', 'Nakoda Jain Tirth'] },
      { name: 'Pachpadra', pincodePrefix: '344032', hubAreas: ['HPCL Rajasthan Refinery Mega Hub', 'Salt Basin', 'Bhandu'] },
      { name: 'Siwana', pincodePrefix: '344044', hubAreas: ['Siwana Fort Town', 'Padru', 'Mokhalsar'] },
      { name: 'Samdari', pincodePrefix: '344021', hubAreas: ['Samdari Railway Junction', 'Piparlai', 'Kalyanpur'] },
      { name: 'Sindhari', pincodePrefix: '344033', hubAreas: ['Sindhari Luni River Hub', 'Adel', 'Kamthe'] }
    ]
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    hindiName: 'जैसलमेर',
    division: 'Jodhpur',
    headquarters: 'Jaisalmer',
    tehsils: [
      { name: 'Jaisalmer Urban', pincodePrefix: '345001', hubAreas: ['Golden Fort Area', 'Sam Sand Dunes', 'Gadisar Road', 'Air Force Colony'] },
      { name: 'Pokaran', pincodePrefix: '345021', hubAreas: ['Ramdevra Tirth Hub', 'Pokaran Town', 'Lathi Gas Hub', 'Sankra'] },
      { name: 'Fatehgarh', pincodePrefix: '345027', hubAreas: ['Fatehgarh Tehsil Hub', 'Devikot', 'Sangad'] },
      { name: 'Bhaniyana', pincodePrefix: '345024', hubAreas: ['Bhaniyana Mandi', 'Phalsund', 'Rajmathai'] }
    ]
  },
  {
    id: 'jalore',
    name: 'Jalore',
    hindiName: 'जालौर',
    division: 'Pali',
    headquarters: 'Jalore',
    tehsils: [
      { name: 'Jalore Urban', pincodePrefix: '343001', hubAreas: ['Granite City Hub', 'Fort Road', 'Bagoda Road', 'RIICO Jalore'] },
      { name: 'Ahore', pincodePrefix: '343017', hubAreas: ['Ahore Town', 'Bhadrajun', 'Nosra'] },
      { name: 'Bhinmal', pincodePrefix: '343029', hubAreas: ['Kavi Magha Nagar', 'Varaha Temple Area', 'Daspan', 'Nandgaon'] },
      { name: 'Sayla', pincodePrefix: '343022', hubAreas: ['Sayla Main', 'Posana', 'Mithri'] }
    ]
  },
  {
    id: 'sanchore',
    name: 'Sanchore',
    hindiName: 'सांचौर',
    division: 'Pali',
    headquarters: 'Sanchore',
    tehsils: [
      { name: 'Sanchore Urban', pincodePrefix: '343041', hubAreas: ['Narmada Canal Hub', 'Amrit Nagar', 'NH-68 Corridor', 'Pathmeda Godham'] },
      { name: 'Chitalwana', pincodePrefix: '343040', hubAreas: ['Chitalwana Tehsil Area', 'Ranodar', 'Duthwa'] },
      { name: 'Bagoda', pincodePrefix: '343032', hubAreas: ['Bagoda Town', 'Jiwana', 'Raniwara Border'] }
    ]
  },
  {
    id: 'sirohi',
    name: 'Sirohi',
    hindiName: 'सिरोही',
    division: 'Pali',
    headquarters: 'Sirohi',
    tehsils: [
      { name: 'Sirohi Urban', pincodePrefix: '307001', hubAreas: ['Palace Road', 'Goyali', 'Sirohi Mandi', 'RIICO Mandar'] },
      { name: 'Mount Abu', pincodePrefix: '307501', hubAreas: ['Nakki Lake Area', 'Dilwara Temples', 'Brahma Kumaris Shantivan', 'Sunset Point'] },
      { name: 'Abu Road', pincodePrefix: '307026', hubAreas: ['RIICO Growth Centre', 'Amthala', 'Maval Industrial Area', 'Chandravati'] },
      { name: 'Pindwara', pincodePrefix: '307022', hubAreas: ['Cement Plants Corridor', 'JK Puram', 'Rohida', 'Virwada'] },
      { name: 'Sheoganj', pincodePrefix: '307027', hubAreas: ['Sheoganj Market', 'Kalandri', 'Paldi'] }
    ]
  },
  {
    id: 'banswara',
    name: 'Banswara',
    hindiName: 'बांसवाड़ा',
    division: 'Banswara',
    headquarters: 'Banswara',
    tehsils: [
      { name: 'Banswara Urban', pincodePrefix: '327001', hubAreas: ['Mahi Bajaj Sagar Hub', 'Custom Circle', 'Kushal Bagh', 'Thikariya Industrial Area'] },
      { name: 'Garhi', pincodePrefix: '327032', hubAreas: ['Partapur Garhi Hub', 'Borda', 'Talwara'] },
      { name: 'Ghatol', pincodePrefix: '327023', hubAreas: ['Ghatol Town', 'Khamera', 'Jagpura Gold Reserve'] },
      { name: 'Kushalgarh', pincodePrefix: '327801', hubAreas: ['Kushalgarh Mandi', 'Doongra', 'Tambesra'] },
      { name: 'Bagidora', pincodePrefix: '327601', hubAreas: ['Bagidora Main', 'Kalinjara', 'Naugama'] },
      { name: 'Sajjangarh', pincodePrefix: '327602', hubAreas: ['Sajjangarh Tehsil Hub', 'Tanda', 'Mahuda'] }
    ]
  },
  {
    id: 'dungarpur',
    name: 'Dungarpur',
    hindiName: 'डूंगरपुर',
    division: 'Banswara',
    headquarters: 'Dungarpur',
    tehsils: [
      { name: 'Dungarpur Urban', pincodePrefix: '314001', hubAreas: ['Gaib Sagar Lake Hub', 'Old City', 'New Colony', 'Shivpura'] },
      { name: 'Sagwara', pincodePrefix: '314025', hubAreas: ['Sagwara Business Hub', 'Galiakot Dargah Belt', 'Bhanor', 'Bhatwada'] },
      { name: 'Aspur', pincodePrefix: '314021', hubAreas: ['Aspur Mandi', 'Beneshwar Dham Tirth', 'Sabla'] },
      { name: 'Simalwara', pincodePrefix: '314030', hubAreas: ['Simalwara Town', 'Chikhli', 'Bhemai'] },
      { name: 'Bicchiwara', pincodePrefix: '314801', hubAreas: ['NH-48 Rajasthan-Gujarat Border Hub', 'Ratanpur Checkpost', 'Kherwara Link'] }
    ]
  },
  {
    id: 'pratapgarh',
    name: 'Pratapgarh',
    hindiName: 'प्रतापगढ़',
    division: 'Banswara',
    headquarters: 'Pratapgarh',
    tehsils: [
      { name: 'Pratapgarh Urban', pincodePrefix: '312605', hubAreas: ['Thewa Art Heritage Zone', 'Kila Road', 'Neemuch Naka', 'Mandasaur Road'] },
      { name: 'Chhoti Sadri', pincodePrefix: '312604', hubAreas: ['Bhawar Mata Sanctuary Belt', 'Gomana', 'Karunda'] },
      { name: 'Dhariawad', pincodePrefix: '313605', hubAreas: ['Sita Mata Wildlife Sanctuary Hub', 'Munja', 'Chari'] },
      { name: 'Arnod', pincodePrefix: '312615', hubAreas: ['Gautameshwar Mahadev Tirth', 'Kotadi', 'Dalot'] },
      { name: 'Peepal Khoont', pincodePrefix: '327003', hubAreas: ['Mahi Catchment Hub', 'Sobhana', 'Thekariya'] }
    ]
  },
  {
    id: 'chittorgarh',
    name: 'Chittorgarh',
    hindiName: 'चित्तौड़गढ़',
    division: 'Udaipur',
    headquarters: 'Chittorgarh',
    tehsils: [
      { name: 'Chittorgarh Urban', pincodePrefix: '312001', hubAreas: ['Chittor Fort Area', 'Collectorate', 'Chanderiya Zinc Smelter Hub', 'Senthi', 'Kapasan Road'] },
      { name: 'Nimbahera', pincodePrefix: '312601', hubAreas: ['Wonder / JK Cement Mega Industrial Zone', 'Javad Road', 'Binota'] },
      { name: 'Rawatbhata', pincodePrefix: '323307', hubAreas: ['Nuclear Power Plant (RAPS) Hub', 'Rana Pratap Sagar Dam', 'Bhaisrogarh'] },
      { name: 'Begun', pincodePrefix: '312023', hubAreas: ['Begun Town', 'Chechat Link', 'Bichor'] },
      { name: 'Kapasan', pincodePrefix: '312202', hubAreas: ['Deewan Sahab Dargah Hub', 'Dhamana', 'Roliyan'] },
      { name: 'Badi Sadri', pincodePrefix: '312401', hubAreas: ['Badi Sadri Mandi', 'Bohera', 'Kanera'] }
    ]
  },
  {
    id: 'rajsamand',
    name: 'Rajsamand',
    hindiName: 'राजसमंद',
    division: 'Udaipur',
    headquarters: 'Rajsamand',
    tehsils: [
      { name: 'Rajsamand (Kankroli)', pincodePrefix: '313324', hubAreas: ['JK Tyre Factory Area', 'Rajsamand Lake', 'Kankroli Dwarikadhish', 'Dhoinda'] },
      { name: 'Nathdwara', pincodePrefix: '313301', hubAreas: ['Shreenathji Mandir', 'Statue of Belief (Viswas Swaroopam)', 'Lalbagh', 'Ganesh Tekri'] },
      { name: 'Kumbhalgarh', pincodePrefix: '313325', hubAreas: ['Kumbhalgarh Fort & Resorts', 'Kelwara', 'Sayra'] },
      { name: 'Amet', pincodePrefix: '313332', hubAreas: ['Amet Marble Hub', 'Jethana', 'Liki'] },
      { name: 'Deogarh', pincodePrefix: '313331', hubAreas: ['Deogarh Madaria', 'Anjana', 'Miyari'] },
      { name: 'Bhim', pincodePrefix: '305921', hubAreas: ['Bhim Highway Hub', 'Todgarh Border', 'Barar'] }
    ]
  },
  {
    id: 'bhilwara',
    name: 'Bhilwara',
    hindiName: 'भीलवाड़ा',
    division: 'Ajmer',
    headquarters: 'Bhilwara',
    tehsils: [
      { name: 'Bhilwara Urban', pincodePrefix: '311001', hubAreas: ['Textile City Hub', 'Gandhi Nagar', 'Subhash Nagar', 'Bhopalganj', 'RIICO Growth Centre', 'Pur'] },
      { name: 'Mandal', pincodePrefix: '311403', hubAreas: ['Mandal Town', 'Meja Dam Area', 'Bhagwanpura'] },
      { name: 'Mandalgarh', pincodePrefix: '311604', hubAreas: ['Mandalgarh Fort', 'Ladpura', 'Triveni Sangam'] },
      { name: 'Asind', pincodePrefix: '311301', hubAreas: ['Devnarayan Sawai Bhoj Dham', 'Bhadu', 'Kareda'] },
      { name: 'Jahazpur', pincodePrefix: '311201', hubAreas: ['Jahazpur Town', 'Pander', 'Bhindar'] },
      { name: 'Shahpura (Bhilwara)', pincodePrefix: '311404', hubAreas: ['Ramsnehi Sampradaya Peeth', 'Khamor', 'Phulia Kalan'] }
    ]
  },
  {
    id: 'shahpura_dist',
    name: 'Shahpura',
    hindiName: 'शाहपुरा (जिला)',
    division: 'Ajmer',
    headquarters: 'Shahpura',
    tehsils: [
      { name: 'Shahpura', pincodePrefix: '311404', hubAreas: ['Shahpura Fort', 'Ramsnehi Dham', 'Kadera', 'Arwad'] },
      { name: 'Jahazpur', pincodePrefix: '311201', hubAreas: ['Jahazpur Town', 'Pander', 'Tikad'] },
      { name: 'Kotri', pincodePrefix: '311603', hubAreas: ['Kotri Shyam Mandir', 'Jalwali', 'Bada Mahua'] },
      { name: 'Banera', pincodePrefix: '311011', hubAreas: ['Banera Fort Town', 'Upreda', 'Sardar Nagar'] }
    ]
  },
  {
    id: 'tonk',
    name: 'Tonk',
    hindiName: 'टोंक',
    division: 'Ajmer',
    headquarters: 'Tonk',
    tehsils: [
      { name: 'Tonk Urban', pincodePrefix: '304001', hubAreas: ['Nawab City Hub', 'Chhawani', 'Bada Kua', 'Subhash Bazar', 'Civil Lines'] },
      { name: 'Niwai', pincodePrefix: '304021', hubAreas: ['Banasthali Vidyapith University Hub', 'Niwai Mandi', 'Jhilai'] },
      { name: 'Deoli', pincodePrefix: '304804', hubAreas: ['CISF Training Centre', 'Bisalpur Dam Catchment', 'Nasirda'] },
      { name: 'Malpura', pincodePrefix: '304502', hubAreas: ['Malpura Town', 'Diggi Kalyan Ji Dham', 'Tordi Sagar'] },
      { name: 'Todaraisingh', pincodePrefix: '304505', hubAreas: ['Bisalpur Dam Headworks', 'Stepwells Zone', 'Bhopatpura'] }
    ]
  },
  {
    id: 'bundi',
    name: 'Bundi',
    hindiName: 'बूंदी',
    division: 'Kota',
    headquarters: 'Bundi',
    tehsils: [
      { name: 'Bundi Urban', pincodePrefix: '323001', hubAreas: ['Taragarh Fort', 'Nawalsagar', 'Azad Nagar', 'RIICO Bundi', 'Khoja Gate'] },
      { name: 'Keshoraipatan', pincodePrefix: '323601', hubAreas: ['Sugar Mill Complex', 'Chambal River Ghat', 'Arneta'] },
      { name: 'Hindoli', pincodePrefix: '323023', hubAreas: ['Hindoli Town', 'Rameshwar Mahadev', 'Dablana'] },
      { name: 'Nainwa', pincodePrefix: '323801', hubAreas: ['Nainwa Town', 'Karwar', 'Deikhera'] },
      { name: 'Indragarh', pincodePrefix: '323613', hubAreas: ['Kamleshwar Mahadev', 'Sumerganj Mandi', 'Lakheri Cement Complex'] }
    ]
  },
  {
    id: 'baran',
    name: 'Baran',
    hindiName: 'बारां',
    division: 'Kota',
    headquarters: 'Baran',
    tehsils: [
      { name: 'Baran Urban', pincodePrefix: '325205', hubAreas: ['Kota Road', 'Char Murti Chauraha', 'Mandi Yard', 'Telgad', 'RIICO Baran'] },
      { name: 'Antah', pincodePrefix: '325202', hubAreas: ['NTPC Gas Power Plant Hub', 'Balaji Mandir', 'Siswali'] },
      { name: 'Chhabra', pincodePrefix: '325220', hubAreas: ['Chhabra Super Thermal Power Plant', 'Gugor Fort', 'Mothpur'] },
      { name: 'Atru', pincodePrefix: '325218', hubAreas: ['Atru Town', 'Ardhkana', 'Kawai Power Plant Area'] },
      { name: 'Shahbad', pincodePrefix: '325217', hubAreas: ['Saharaya Tribal Belt', 'Shahbad Fort', 'Kelwara Sitabari Dham'] }
    ]
  },
  {
    id: 'jhalawar',
    name: 'Jhalawar',
    hindiName: 'झालावाड़',
    division: 'Kota',
    headquarters: 'Jhalawar',
    tehsils: [
      { name: 'Jhalrapatan / Jhalawar Urban', pincodePrefix: '326001', hubAreas: ['Gagron Fort Area', 'City of Bells (Jhalrapatan)', 'Medical College Hub', 'Chandrabhaga'] },
      { name: 'Aklera', pincodePrefix: '326033', hubAreas: ['Aklera Town', 'Ghatoli', 'Sarola Kalan'] },
      { name: 'Bhawani Mandi', pincodePrefix: '326502', hubAreas: ['Railway Station (RJ-MP Split)', 'Textile Hub', 'Pachpahar'] },
      { name: 'Pirawa', pincodePrefix: '326034', hubAreas: ['Pirawa Town', 'Sunel', 'Ratlai'] },
      { name: 'Khanpur', pincodePrefix: '326038', hubAreas: ['Khanpur Town', 'Maraytha', 'Taraj'] },
      { name: 'Manoharthana', pincodePrefix: '326037', hubAreas: ['Kamkheda Balaji Tirth', 'Chandi', 'Bhalta'] }
    ]
  },
  {
    id: 'bharatpur',
    name: 'Bharatpur',
    hindiName: 'भरतपुर',
    division: 'Bharatpur',
    headquarters: 'Bharatpur',
    tehsils: [
      { name: 'Bharatpur Urban', pincodePrefix: '321001', hubAreas: ['Keoladeo Bird Sanctuary Belt', 'Lohagarh Fort', 'Circular Road', 'Kumher Gate', 'Brij Industrial Area'] },
      { name: 'Bayana', pincodePrefix: '321401', hubAreas: ['Bayana Fort Town', 'Damdama', 'Kalsada'] },
      { name: 'Nadbai', pincodePrefix: '321602', hubAreas: ['Nadbai Town', 'Kherli Road', 'Baroli'] },
      { name: 'Rupbas', pincodePrefix: '321404', hubAreas: ['Rupbas Town', 'Khanua Battlefield Area', 'Rudawal Pink Stone Belt'] },
      { name: 'Weir', pincodePrefix: '321408', hubAreas: ['Weir Fort Town', 'Bhusawar Pickles Hub', 'Halena'] }
    ]
  },
  {
    id: 'deeg',
    name: 'Deeg',
    hindiName: 'डीग',
    division: 'Bharatpur',
    headquarters: 'Deeg',
    tehsils: [
      { name: 'Deeg', pincodePrefix: '321203', hubAreas: ['Water Palaces (Jal Mahal)', 'Laxman Temple Area', 'Januther', 'Bahaj'] },
      { name: 'Kaman', pincodePrefix: '321022', hubAreas: ['Kamvan Brij Chaurasi Kos', 'Kosi Road', 'Bolen'] },
      { name: 'Kumher', pincodePrefix: '321201', hubAreas: ['Kumher Town', 'Sikrori', 'Ajau'] },
      { name: 'Nagar', pincodePrefix: '321205', hubAreas: ['Nagar Mandi', 'Ghatmika', 'Sikri'] },
      { name: 'Pahari', pincodePrefix: '321024', hubAreas: ['Pahari Border Belt', 'Papda', 'Gopalgarh'] }
    ]
  },
  {
    id: 'dholpur',
    name: 'Dholpur',
    hindiName: 'धौलपुर',
    division: 'Bharatpur',
    headquarters: 'Dholpur',
    tehsils: [
      { name: 'Dholpur Urban', pincodePrefix: '328001', hubAreas: ['Red Stone Quarry Zone', 'Machkund Dham', 'Nihal Tower', 'Chambal Safari Belt', 'RIICO Dholpur'] },
      { name: 'Bari', pincodePrefix: '328021', hubAreas: ['Bari Fort Town', 'Gummat', 'Talab-e-Shahi'] },
      { name: 'Rajakhera', pincodePrefix: '328025', hubAreas: ['Rajakhera Town', 'Shamsabad Road', 'Marena'] },
      { name: 'Baseri', pincodePrefix: '328022', hubAreas: ['Baseri Town', 'Kanakpura', 'Jharikheda'] },
      { name: 'Sarmathura', pincodePrefix: '328026', hubAreas: ['Damoh Waterfall Hub', 'Angai Dam Area', 'Bhurpura'] }
    ]
  },
  {
    id: 'karauli',
    name: 'Karauli',
    hindiName: 'करौली',
    division: 'Bharatpur',
    headquarters: 'Karauli',
    tehsils: [
      { name: 'Karauli Urban', pincodePrefix: '322241', hubAreas: ['Madan Mohan Ji Dham', 'City Palace', 'Kailadevi Road', 'Gulab Bagh', 'Masalpur'] },
      { name: 'Hindaun City', pincodePrefix: '322230', hubAreas: ['Sandstone Export Hub', 'Station Road', 'Mahaveer Ji Tirth Belt', 'Kherli Naka'] },
      { name: 'Sapotra', pincodePrefix: '322218', hubAreas: ['Sapotra Town', 'Karanpur', 'Mandrayal Road'] },
      { name: 'Todabhim', pincodePrefix: '321611', hubAreas: ['Todabhim Mandi', 'Padampura', 'Nangal Sherpur'] }
    ]
  },
  {
    id: 'sawai_madhopur',
    name: 'Sawai Madhopur',
    hindiName: 'सवाई माधोपुर',
    division: 'Bharatpur',
    headquarters: 'Sawai Madhopur',
    tehsils: [
      { name: 'Sawai Madhopur Urban', pincodePrefix: '322001', hubAreas: ['Ranthambore National Park Gateway', 'Bazaria', 'City Center', 'Kherda', 'Ranthambore Road'] },
      { name: 'Chauth Ka Barwara', pincodePrefix: '322701', hubAreas: ['Chauth Mata Mandir Hub', 'Six Senses Fort Barwara Belt', 'Isarda Dam'] },
      { name: 'Khandar', pincodePrefix: '322025', hubAreas: ['Khandar Fort Town', 'Rameshwaram Chambal Confluence', 'Bahrawanda Kalan'] },
      { name: 'Bonli', pincodePrefix: '322023', hubAreas: ['Bonli Town', 'Mitrapura', 'Bapui'] }
    ]
  },
  {
    id: 'gangapur_city',
    name: 'Gangapur City',
    hindiName: 'गंगापुर सिटी',
    division: 'Bharatpur',
    headquarters: 'Gangapur City',
    tehsils: [
      { name: 'Gangapur Urban', pincodePrefix: '322201', hubAreas: ['Railway Junction Coaching Hub', 'Saloda Industrial Area', 'Kalyan Ji Chowk', 'Udham Singh Circle'] },
      { name: 'Wazirpur', pincodePrefix: '322219', hubAreas: ['Wazirpur Town', 'Meena Baroda', 'Khandeep'] },
      { name: 'Bamanwas', pincodePrefix: '322211', hubAreas: ['Bamanwas Town', 'Piplai', 'Sukkar'] }
    ]
  },
  {
    id: 'dausa',
    name: 'Dausa',
    hindiName: 'दौसा',
    division: 'Jaipur',
    headquarters: 'Dausa',
    tehsils: [
      { name: 'Dausa Urban', pincodePrefix: '303303', hubAreas: ['Somnath Temple Area', 'Collectorate', 'Agra Highway Corridor', 'Gandhi Tiraha', 'RIICO Dausa'] },
      { name: 'Bandikui', pincodePrefix: '303313', hubAreas: ['Railway Junction Hub', 'Abhaneri Chand Baori Tirth', 'Baswa'] },
      { name: 'Lalsot', pincodePrefix: '303503', hubAreas: ['Lalsot Mandi', 'Rahuwas', 'Mandawari', 'Didwana Dausa'] },
      { name: 'Mahwa', pincodePrefix: '321608', hubAreas: ['Mahwa Town', 'Kherla', 'Mandawar Dausa'] },
      { name: 'Sikrai', pincodePrefix: '303508', hubAreas: ['Mehandipur Balaji Dham Hub', 'Manpur Highway', 'Gadh'] }
    ]
  },
  {
    id: 'kotputli_behror',
    name: 'Kotputli-Behror',
    hindiName: 'कोटपूतली-बहरोड़',
    division: 'Jaipur',
    headquarters: 'Kotputli',
    tehsils: [
      { name: 'Kotputli Urban', pincodePrefix: '303108', hubAreas: ['UltraTech Cement Hub', 'Paniyala Mode', 'Delhi-Jaipur Expressway', 'Gokalpura'] },
      { name: 'Behror', pincodePrefix: '301017', hubAreas: ['RIICO Behror', 'Highway Midways', 'Guhana', 'Bardod'] },
      { name: 'Neemrana', pincodePrefix: '301705', hubAreas: ['Japanese Industrial Zone', 'Neemrana Fort Palace', 'Hero MotoCorp Industrial Area', 'Majrakath'] },
      { name: 'Bansur', pincodePrefix: '301402', hubAreas: ['Bansur Town', 'Harsora', 'Rampur'] },
      { name: 'Paota', pincodePrefix: '303106', hubAreas: ['Paota Mode', 'Todi', 'Bhurawas'] }
    ]
  },
  {
    id: 'khairthal_tijara',
    name: 'Khairthal-Tijara',
    hindiName: 'खैरथल-तिजारा',
    division: 'Jaipur',
    headquarters: 'Khairthal',
    tehsils: [
      { name: 'Khairthal', pincodePrefix: '301404', hubAreas: ['Grain & Mustard Mandi Hub', 'Railway Station Road', 'Matasya Industrial Area'] },
      { name: 'Tijara', pincodePrefix: '301411', hubAreas: ['Chandraprabhu Jain Tirth', 'Bhiwadi Industrial Sub-Hub', 'Tapukara Corridor'] },
      { name: 'Kishangarh Bas', pincodePrefix: '301405', hubAreas: ['Kishangarh Bas Market', 'Baghor', 'Bambora'] },
      { name: 'Kotkasim', pincodePrefix: '301702', hubAreas: ['Kotkasim Town', 'Pur', 'Ladbhuja'] },
      { name: 'Mundawar', pincodePrefix: '301407', hubAreas: ['Mundawar Junction', 'Sodawas', 'Beroj'] }
    ]
  },
  {
    id: 'neem_ka_thana',
    name: 'Neem Ka Thana',
    hindiName: 'नीम का थाना',
    division: 'Sikar',
    headquarters: 'Neem Ka Thana',
    tehsils: [
      { name: 'Neem Ka Thana Urban', pincodePrefix: '332713', hubAreas: ['Mineral Rich Hub', 'Kapil Hospital Road', 'Khetri Mod', 'Chawla Colony'] },
      { name: 'Sri Madhopur', pincodePrefix: '332715', hubAreas: ['Sri Madhopur Town', 'Mau', 'Jorawar Nagar'] },
      { name: 'Khandela', pincodePrefix: '332709', hubAreas: ['Khandela Gota Patti Hub', 'Barsinghpura', 'Jajod'] },
      { name: 'Patan', pincodePrefix: '332718', hubAreas: ['Patan Fort', 'Hasampur', 'Dabla'] }
    ]
  },
  {
    id: 'anupgarh',
    name: 'Anupgarh',
    hindiName: 'अनूपगढ़',
    division: 'Bikaner',
    headquarters: 'Anupgarh',
    tehsils: [
      { name: 'Anupgarh', pincodePrefix: '335701', hubAreas: ['Border Agriculture Mandi', 'Gharsana Road', 'Ramsinghpur', 'Patroda'] },
      { name: 'Suratgarh', pincodePrefix: '335804', hubAreas: ['Super Thermal Power Station', 'Air Force Base', 'Birdhwal', 'Rangmahal'] },
      { name: 'Raisinghnagar', pincodePrefix: '335051', hubAreas: ['Raisinghnagar Mandi', 'Muklawa', 'Gajsinghpur'] },
      { name: 'Gharsana', pincodePrefix: '335711', hubAreas: ['New Gharsana', 'Rawla Mandi', 'Sattasar'] },
      { name: 'Sri Vijaynagar', pincodePrefix: '335704', hubAreas: ['Vijaynagar Mandi', 'Jaitsar Agriculture Farm Area'] }
    ]
  },
  {
    id: 'sri_ganganagar',
    name: 'Sri Ganganagar',
    hindiName: 'श्रीगंगानगर',
    division: 'Bikaner',
    headquarters: 'Sri Ganganagar',
    tehsils: [
      { name: 'Sri Ganganagar Urban', pincodePrefix: '335001', hubAreas: ['Food Basket of Rajasthan', 'Sukhadia Circle', 'Gol Bazar', 'Purani Abadi', 'Udyog Vihar RIICO'] },
      { name: 'Karanpur (Sri Karanpur)', pincodePrefix: '335073', hubAreas: ['Karanpur Border Mandi', 'Ghamurwali', 'Kaminpura'] },
      { name: 'Sadulshahar', pincodePrefix: '335062', hubAreas: ['Sadulshahar Mandi', 'Budharwali', 'Khatsajwar'] },
      { name: 'Padampur', pincodePrefix: '335041', hubAreas: ['Padampur Town', 'Ridmalsar', 'Dalpatpura'] }
    ]
  },
  {
    id: 'hanumangarh',
    name: 'Hanumangarh',
    hindiName: 'हनुमानगढ़',
    division: 'Bikaner',
    headquarters: 'Hanumangarh',
    tehsils: [
      { name: 'Hanumangarh Town & Junction', pincodePrefix: '335512', hubAreas: ['Bhatner Fort Area', 'Hanumangarh Junction Market', 'Sector 12', 'RIICO Industrial Area'] },
      { name: 'Nohar', pincodePrefix: '335523', hubAreas: ['Gogamedi Dham Pilgrimage Hub', 'Nohar Mandi', 'Fefana'] },
      { name: 'Bhadra', pincodePrefix: '335501', hubAreas: ['Bhadra Town', 'Chani Badi', 'Malsisar'] },
      { name: 'Rawatsar', pincodePrefix: '335524', hubAreas: ['Rawatsar Mandi', 'Chaiyan', 'Baramsar'] },
      { name: 'Sangaria', pincodePrefix: '335063', hubAreas: ['Gramotthan Vidyapeeth', 'Sangaria Mandi', 'Bolawali'] },
      { name: 'Pilibanga', pincodePrefix: '335803', hubAreas: ['Kalibangan Indus Valley Site', 'Pilibanga Town', 'Goluwala'] }
    ]
  },
  {
    id: 'beawar',
    name: 'Beawar',
    hindiName: 'ब्यावर',
    division: 'Ajmer',
    headquarters: 'Beawar',
    tehsils: [
      { name: 'Beawar Urban', pincodePrefix: '305901', hubAreas: ['Tilpatti Capital of India', 'Shree Cement Industrial Zone', 'Chang Gate', 'Mewari Gate', 'Sendra Road'] },
      { name: 'Masuda', pincodePrefix: '305623', hubAreas: ['Masuda Town', 'Kharwa', 'Jamola'] },
      { name: 'Badnor', pincodePrefix: '311302', hubAreas: ['Badnor Fort', 'Bhim Border', 'Oda'] },
      { name: 'Raipur (Pali-Beawar)', pincodePrefix: '306102', hubAreas: ['Raipur Mandi', 'Sendra Stone Hub', 'Bar'] }
    ]
  },
  {
    id: 'kekri',
    name: 'Kekri',
    hindiName: 'केकड़ी',
    division: 'Ajmer',
    headquarters: 'Kekri',
    tehsils: [
      { name: 'Kekri', pincodePrefix: '305404', hubAreas: ['Kekri Mandi', 'Ajmer Road', 'Meena Seema Hub', 'Khadawali'] },
      { name: 'Sarwar', pincodePrefix: '305403', hubAreas: ['Fakharuddin Dargah', 'Sarwar Lake Area', 'Gordhanpura'] },
      { name: 'Bhinay', pincodePrefix: '305622', hubAreas: ['Bhinay Fort Town', 'Kora', 'Sobhari'] },
      { name: 'Sawar', pincodePrefix: '305407', hubAreas: ['Sawar Town', 'Bada Kheda', 'Tikra'] }
    ]
  },
  {
    id: 'salumbar',
    name: 'Salumbar',
    hindiName: 'सलूंबर',
    division: 'Udaipur',
    headquarters: 'Salumbar',
    tehsils: [
      { name: 'Salumbar', pincodePrefix: '313804', hubAreas: ['Hadi Rani Heritage Town', 'Lake Dhebar (Jaisamand Lake) Hub', 'Bhabrana'] },
      { name: 'Sarada', pincodePrefix: '313902', hubAreas: ['Sarada Town', 'Semari Road', 'Chawand Maharana Pratap Memorial'] },
      { name: 'Lasadiya', pincodePrefix: '313604', hubAreas: ['Lasadiya Forest Belt', 'Kun', 'Dhamaniya'] },
      { name: 'Jhallara', pincodePrefix: '313038', hubAreas: ['Jhallara Tehsil Area', 'Gingla', 'Dharod'] }
    ]
  },
  {
    id: 'phalodi',
    name: 'Phalodi',
    hindiName: 'फलौदी',
    division: 'Jodhpur',
    headquarters: 'Phalodi',
    tehsils: [
      { name: 'Phalodi Urban', pincodePrefix: '342301', hubAreas: ['Solar Park Capital of Rajasthan', 'Salt Basin', 'Bhadla Mega Solar Park Hub', 'Khichan Demoiselle Crane Hub'] },
      { name: 'Bap', pincodePrefix: '342307', hubAreas: ['Bap Boulder Belt', 'Nokhra Solar Hub', 'Malhar'] },
      { name: 'Dechu', pincodePrefix: '342314', hubAreas: ['Dechu Desert Camps', 'Kushallaya', 'Gilakor'] },
      { name: 'Luni-Phalodi Rural', pincodePrefix: '342308', hubAreas: ['Aau', 'Chadi', 'Bapini'] }
    ]
  },
  {
    id: 'dudu',
    name: 'Dudu',
    hindiName: 'दूदू',
    division: 'Jaipur',
    headquarters: 'Dudu',
    tehsils: [
      { name: 'Dudu Urban & Rural', pincodePrefix: '303008', hubAreas: ['NH-48 Jaipur-Ajmer Expressway Hub', 'Dudu Mandi', 'Bagru Border'] },
      { name: 'Mozamabad (Mauzamabad)', pincodePrefix: '303009', hubAreas: ['Man Singh I Birthplace', 'Mahar Kalan', 'Bichun'] },
      { name: 'Phagi', pincodePrefix: '303005', hubAreas: ['Phagi Town', 'Nimera', 'Chittora Dam', 'Manda'] }
    ]
  }
];

export const OTHER_METRO_CITIES = [
  { id: 'delhi', name: 'New Delhi & NCR', state: 'Delhi' },
  { id: 'noida', name: 'Noida & Greater Noida', state: 'Uttar Pradesh' },
  { id: 'mumbai', name: 'Mumbai & MMR', state: 'Maharashtra' },
  { id: 'bengaluru', name: 'Bengaluru Silicon Corridor', state: 'Karnataka' },
  { id: 'gurugram', name: 'Gurugram & Manesar', state: 'Haryana' }
];
