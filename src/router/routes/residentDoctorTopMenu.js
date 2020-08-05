// 住院医生顶部导航
import residentDoctorTopMenuDic from '../dictionary/residentDoctorTopMenu'

const navRoutes = [
	{
		name: `${residentDoctorTopMenuDic.medicineRecordQualityControl.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.medicineRecordQualityControl.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.qualityControlDetail.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.qualityControlDetail.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.importantDiseasesTypeMedisineRecordWriten.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.importantDiseasesTypeMedisineRecordWriten.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.chineseAndWesternMedisineRecordWriten.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.chineseAndWesternMedisineRecordWriten.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.qualityControlReport.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.qualityControlReport.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.medisineRecordOpenManage.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.medisineRecordOpenManage.cn}`
				}
			}
		]
	},
	{
		name: `${residentDoctorTopMenuDic.imagesManage.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.imagesManage.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.subImagesManage.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.subImagesManage.cn}`
				}
			}
		]
	},
	{
		name: `${residentDoctorTopMenuDic.ICDManage.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.ICDManage.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.subICEManage.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.subICEManage.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.operationCode.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.operationCode.cn}`
				}
			}
		]
	},
	{
		name: `${residentDoctorTopMenuDic.knowledageManage.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.knowledageManage.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.drugsData.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.drugsData.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.ICD_10InternationalCode.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.ICD_10InternationalCode.cn}`
				}
			}
		]
	},
	{
		name: `${residentDoctorTopMenuDic.tplManage.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.tplManage.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.subTplManage.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.subTplManage.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.subTpls.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.subTpls.cn}`
				}
			}
		]
	},
	{
		name: `${residentDoctorTopMenuDic.diagnosisManage.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.diagnosisManage.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.diagnosis.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.diagnosis.cn}`
				}
			}
		]
	},
	{
		name: `${residentDoctorTopMenuDic.medisineRecordManage.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.medisineRecordManage.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.medicineRecordBorrow.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.medicineRecordBorrow.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.medicineRecordRecall.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.medicineRecordRecall.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.borrowExamine.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.borrowExamine.cn}`
				}
			}
		]
	},
	{
		name: `${residentDoctorTopMenuDic.tools.en}`,
		path: ``,
		meta: {
			title: `${residentDoctorTopMenuDic.tools.cn}`
		},
		children: [
			{
				name: `${residentDoctorTopMenuDic.timeAxis.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.timeAxis.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.infectiousDiseaseReport.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.infectiousDiseaseReport.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.examineRecordSearch.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.examineRecordSearch.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.chronicDiseaseReport.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.chronicDiseaseReport.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.agriculturalChemicalsPoisoningReport.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.agriculturalChemicalsPoisoningReport.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.chronicPatientInvestigationTable.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.chronicPatientInvestigationTable.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.infectiousRegistrationTable.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.infectiousRegistrationTable.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.drugAdverseReactionReport.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.drugAdverseReactionReport.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.definiteDiagnosis.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.definiteDiagnosis.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.patientSearch.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.patientSearch.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.selfPayDrugNotify.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.selfPayDrugNotify.cn}`
				}
			},
			{
				name: `${residentDoctorTopMenuDic.diagnosisProject.en}`,
				path: ``,
				meta: {
					title: `${residentDoctorTopMenuDic.diagnosisProject.cn}`
				}
			}
		]
	}
]

export default navRoutes
