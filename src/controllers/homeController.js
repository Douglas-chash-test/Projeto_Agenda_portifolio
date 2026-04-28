exports.index = (req , res) => {
  res.render('index');
}

exports.controle = (req , res) => {
  res.send('controle feito pelo controller!!');
}