import request from '@/utils/fetch'
import api from '@/global/api'

export function delData (data) {
	console.log('data', data)
	return request({
		url: `${api.syncManage.delDatasetTemplate}`,
		method: 'post',
		data
	})
}

export function saveData (data) {
	console.log('saveData', data)
	return request({
		url: `${api.syncManage.datasetTemplateSave}`,
		method: 'post',
		data
	})
}
