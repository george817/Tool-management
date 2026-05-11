export const DEMO_USERS = {
  operator: { id: 1, name: 'Ravi Kumar', role: 'operator', department: 'Tool Room' },
  manager: { id: 2, name: 'Priya Sharma', role: 'manager', department: 'Operations' },
  director: { id: 3, name: 'Arjun Mehta', role: 'director', department: 'Leadership' },
  admin: { id: 4, name: 'System Administrator', role: 'admin', department: 'IT' },
}

export const mockUsers = [
  ...Object.values(DEMO_USERS).map((user) => ({
    ...user,
    phone: '+91 98765 10000',
    email: `${user.name.toLowerCase().replace(' ', '.')}@assetops.local`,
  })),
  { id: 101, name: 'Amit Singh', role: 'technician', department: 'Site A', phone: '+91 98765 10001', email: 'amit.singh@assetops.local' },
  { id: 102, name: 'Suresh Menon', role: 'technician', department: 'Site B', phone: '+91 98765 10002', email: 'suresh.menon@assetops.local' },
  { id: 103, name: 'Neha Verma', role: 'engineer', department: 'Electrical', phone: '+91 98765 10003', email: 'neha.verma@assetops.local' },
  { id: 104, name: 'Imran Khan', role: 'supervisor', department: 'Workshop', phone: '+91 98765 10004', email: 'imran.khan@assetops.local' },
  { id: 105, name: 'Vikram Rao', role: 'operator', department: 'Warehouse', phone: '+91 98765 10005', email: 'vikram.rao@assetops.local' },
  { id: 106, name: 'Kiran Patel', role: 'technician', department: 'Transport', phone: '+91 98765 10006', email: 'kiran.patel@assetops.local' },
  { id: 107, name: 'Meera Iyer', role: 'engineer', department: 'Site C', phone: '+91 98765 10007', email: 'meera.iyer@assetops.local' },
  { id: 108, name: 'Deepak Yadav', role: 'technician', department: 'Fabrication', phone: '+91 98765 10008', email: 'deepak.yadav@assetops.local' },
  { id: 109, name: 'Pooja Nair', role: 'planner', department: 'Operations', phone: '+91 98765 10009', email: 'pooja.nair@assetops.local' },
  { id: 110, name: 'Rahul Jain', role: 'technician', department: 'Site A', phone: '+91 98765 10010', email: 'rahul.jain@assetops.local' },
  { id: 111, name: 'Anita Das', role: 'supervisor', department: 'Site B', phone: '+91 98765 10011', email: 'anita.das@assetops.local' },
  { id: 112, name: 'Nikhil Saini', role: 'driver', department: 'Transport', phone: '+91 98765 10012', email: 'nikhil.saini@assetops.local' },
  { id: 113, name: 'Farah Ali', role: 'engineer', department: 'Electrical', phone: '+91 98765 10013', email: 'farah.ali@assetops.local' },
  { id: 114, name: 'Gopal Krishnan', role: 'technician', department: 'Workshop', phone: '+91 98765 10014', email: 'gopal.krishnan@assetops.local' },
  { id: 115, name: 'Tara Shah', role: 'coordinator', department: 'Warehouse', phone: '+91 98765 10015', email: 'tara.shah@assetops.local' },
  { id: 116, name: 'Manoj Bhatia', role: 'technician', department: 'Site C', phone: '+91 98765 10016', email: 'manoj.bhatia@assetops.local' },
  { id: 117, name: 'Sonal Gupta', role: 'quality', department: 'Fabrication', phone: '+91 98765 10017', email: 'sonal.gupta@assetops.local' },
  { id: 118, name: 'Harish Pillai', role: 'supervisor', department: 'Power Bay', phone: '+91 98765 10018', email: 'harish.pillai@assetops.local' },
  { id: 119, name: 'Ritika Bansal', role: 'analyst', department: 'Operations', phone: '+91 98765 10019', email: 'ritika.bansal@assetops.local' },
  { id: 120, name: 'Mohit Saxena', role: 'technician', department: 'Site A', phone: '+91 98765 10020', email: 'mohit.saxena@assetops.local' },
  { id: 121, name: 'Lata Kulkarni', role: 'stores', department: 'Tool Room', phone: '+91 98765 10021', email: 'lata.kulkarni@assetops.local' },
  { id: 122, name: 'Ajay Thakur', role: 'mechanic', department: 'Workshop', phone: '+91 98765 10022', email: 'ajay.thakur@assetops.local' },
]

export const getUserById = (id) => mockUsers.find((user) => user.id === Number(id))
