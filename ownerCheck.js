module.exports = function isOwner(user) {
    const botOwners = ['439172671922503699', '705903345075748965', '601935335362002954'];
        if(botOwners.findIndex(u => u === user.author.id) === -1) {
          return false;
        } else {
          return true;
        }

}
