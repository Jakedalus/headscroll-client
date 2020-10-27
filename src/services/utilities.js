export function convertImageDataToUrl(profileImage) {
	var arrayBufferView = new Uint8Array(profileImage);
	var blob = new Blob([ arrayBufferView ], {
		type: 'image/jpeg'
	});
	var urlCreator = window.URL || window.webkitURL;
	var imageUrl = urlCreator.createObjectURL(blob);
	return imageUrl;
}
