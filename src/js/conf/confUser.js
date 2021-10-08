const  confUser  = {
	"role_Arrs": [ 1, 3, 5, 101, 105 ],
	"role": {
		"1": {path: 'ower',
			roleNav: [ 
				{icon:"bx bx-user", 			     label: "users", to: "/ower/users"}, 
				{icon:"bx bx-building-house", 	 label: "shops", to: "/ower/shops"}, 
				{icon:"bx bx-package", 			label: "pds", to: "/ower/pds"}, 
				{icon:"bx bx-list-ul", 				label: "orders", to: "/ower/orders"},
				{icon:"bx bx-category",			 label: "categs", to: "/ower/categs"},
				{icon:"bx bx-purchase-tag-alt", label: "brands", to: "/ower/brands"},
				{icon:"bx bx-user-circle",		 label: "clients", to: "/ower/binds"},
				{icon:"bx bx-cog", 				label: "setting", to: "/ower/setting"},
			]
		},
		"3": {path: 'mger',
			roleNav: [ 
				{icon:"bx bx-user", 				label: "users",		  to: "/mger/users"}, 
				{icon:"bx bx-building-house", 	   label: "shops", 		to: "/mger/shops"},
				{icon:"bx bx-package", 			   label: "pds",		to: "/mger/pds"}, 
				{icon:"bx bx-list-ul", 				label: "orders",	to: "/ower/orders"},
				{icon:"bx bx-category", 		   label: "categs",		to: "/mger/categs"},
				{icon:"bx bx-purchase-tag-alt",     label: "brands",	to: "/mger/brands"},
				{icon:"bx bx-user-circle",		 label: "Client", 		to: "/mger/binds"},
				{icon:"bx bx-cog", 				label: "setting", 	to: "/mger/setting"},
			]
		},
		"5": {path: 'sfer', 
			roleNav: [
				{icon:"bx bx-building-house", 	   label: "shops", 		to: "/sfer/shops"},
				{icon:"bx bx-package", 			   label: "pds",		 to: "/sfer/pds"}, 
				{icon:"bx bx-list-ul", 				label: "orders", 	to: "/ower/orders"},
				{icon:"bx bx-category", 		   label: "categs", 	   to: "/sfer/categs"},
				{icon:"bx bx-purchase-tag-alt",     label: "brands", 		to: "/sfer/brands"},
				{icon:"bx bx-cog", 				label: "setting", 	    to: "/sfer/setting"},
			]
		},
		"101": {path: 'bser', 
			roleNav: [
				{icon:"bx bx-user",				label: "users", 	to: "/bser/users"}, 
				{icon:"bx bxs-package",			label: "prods", 	to: "/bser/prods"},
				{icon:"bx bx-list-ul", 				label: "orders", 	to: "/bser/orders"},
				{icon:"bx bx-package", 			   label: "pds",		 to: "/bser/pds"}, 
				{icon:"bx bx-cog", 				label: "setting", 	to: "/bser/setting"},
			]
		},
		"105": {path: 'wker', 
			roleNav: [ 
				{icon:"bx bxs-package",			 label: "prods", 	to: "/wker/prods"},
				{icon:"bx bx-list-ul", 				label: "orders", 	to: "/wker/orders"},
				{icon:"bx bx-package", 			   label: "pds",		 to: "/bser/pds"}, 
				{icon:"bx bx-cog", 				label: "setting", 	to: "/wker/setting"},
			]
		},
	},
}

export const getRolePath = (role = parseInt(localStorage.getItem('role'))) => {
	if(!confUser.role_Arrs.includes(role)) return 'home';
	return  confUser.role[role].path;
}

export const getRoleLinks = (role = parseInt(localStorage.getItem('role'))) => {
	if(!confUser.role_Arrs.includes(role)) return [];
	return  confUser.role[role].roleNav;
}

export const role_Arrs = confUser.role_Arrs;

export default confUser