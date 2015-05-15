/**
 * @brief Recuper le contenu d'un input
 * @param input ClassName ou Id de l'input
 * @returns string Contenu de l'input
 */
function getInput(input){
  return $(input).val();
}

/**
 * @brief Vide le contenu d'un input
 * @param input ClassName ou Id de l'input
 */
function clearInput(input){
  $(input).val("");
}