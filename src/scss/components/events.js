var Event = require('events').EventEmitter;

module.exports = function (engine,book) {

  book.on(engine.Types.OrderEvent.book_update, (trans_id) => {
    console.log('transaction id:', trans_id)
  });


  book.on(engine.Types.OrderEvent.accept, (data) => {
    console.log('accept:', data)
  });

  book.on(engine.Types.OrderEvent.cancel, (data) => {
    console.log('cancel:', data)
  });

  book.on(engine.Types.OrderEvent.fill, (data) => {
    console.log('fill:', data)
  });

};
