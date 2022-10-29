export function getAllListenedButtons() {
	let buttons = document.querySelectorAll('.listenedButton')
	return [...buttons]
}

export function defineButtonFunction(functionList, button) {
	const id = button.id;
	const functionTag = id.substring(0, id.indexOf('-'))

	return functionList[functionTag]
}
