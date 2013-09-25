(function ($, BB,_){

//Entire Item View
	var ItemView = Backbone.View.extend({
		el: '#contents',
		events: {
			'click #add_item_butt' : 'addItem'
		},
		initialize: function(){
			this.itemName = $('#add_item_table input[name="item_name"]');
			this.supplier = $('#add_item_table input[name="item_supplier"]');
			this.quantity = $('#add_item_table input[name= "item_quantity"]');
			this.item_table = $('#item_table tbody');
			this.listenTo(this.collection, 'add', this.createItem);
			console.log(this.item_table);
		},
		addItem: function(){
			var item = new perItemModel({
				itemName 	: this.itemName.val(),
				supplier 	: this.supplier.val(),
				quantity 	: this.quantity.val()

			});
			

			this.collection.add(item);
			//console.log(item);
			//var perView = new perItemVIew({model: item});
			//this.item_table.append(perView.render().el);
			
		},
		createItem: function(model){
			
			var perView = new perItemVIew({model: model});
			this.item_table.append(perView.render().el);
		}


	});

	//individual item view
	var perItemVIew = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#item_template').html()),
		initialize:function(){

		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	//item model
	var perItemModel = Backbone.Model.extend({
		defaults:{
			itemName:'-',
			supplier: '-',
			quantity: '-'
		},
		initialize: function(){

		}

	});
	//item collection
	var perItemCollection = Backbone.Collection.extend({
		model: perItemModel,
		url:'',
		initialize: function(){

		}
	});

	ItemApp = new ItemView({collection: new perItemCollection()});

})(jQuery, Backbone, _)