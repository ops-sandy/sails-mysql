module.exports = {
    //-----------------------------------------------
    //
    // http://localhost:1337/dbinfo/columndef/role?excludebase=true&basemodeladvanced=false&generatecode=false
    //------------------------------------------------
    columndef: function (req, res) {
        //Build configuration parameter object (Start)
        var params = {};
        params.table = !sails._.isUndefined(req.param('id')) ? req.param('id') : '';
        params.basemodeladvanced = sails._string.toBoolean(!sails._.isUndefined(req.query.basemodeladvanced) && req.query.basemodeladvanced);
        params.excludebase = sails._string.toBoolean(!sails._.isUndefined(req.query.excludebase) && req.query.excludebase);
        params.generatecode = sails._string.toBoolean(!sails._.isUndefined(req.query.generatecode) && req.query.generatecode);        
        //(End)

        sails.hooks.views.render(sails.config.codegen.queryColumndefTemplate, params, function (err, view) {
            if (err) {
                res.send(err);
            } else {                
                sails.models.user.query(view, function (err, results) {
                    if (err) {
                        res.send(err);
                    } else {
                        //Bring this from custom config.
                        var excludes = [];
                        if (params.excludebase) {
                            excludes = sails.config.codegen.baseFields;
                        }
                        
                        var newmap = [];
                        sails._.each(results, function (o) {
                            if (!sails._.contains(excludes, o.column_name)) {
                                //if (sails._string.include(sails.config.codegen.stringTypesInPostgreSql, o.data_type)) {
                                //    o.data_type = sails.config.codegen.stringTypesInSails;
                                //}
                                //if (sails._string.include(sails.config.codegen.numericTypesInPostgreSql, o.data_type)) {
                                //    o.data_type = sails.config.codegen.numericTypesInSails;
                                //}
                                //if (sails._string.include(sails.config.codegen.jsonTypesInPostgreSql, o.data_type)) {
                                //    o.data_type = sails.config.codegen.jsonTypesInSails;
                                //}
                                //if (sails._string.include(sails.config.codegen.dateTypesInPostgreSql, o.data_type)) {
                                //    o.data_type = sails.config.codegen.dateTypesInSails;
                                //}
                                newmap.push(o);
                            }
                        });
                        params.column_names = newmap;
                      
                        //Generate Model & controller code                    
                        if (params.generatecode) {
                            var modelOptions = {};
                            var controllerOptions = {};
                            modelOptions.template = sails.config.codegen.modelCodeTemplate;
                            modelOptions.savetofolder = "api/models/" + params.table + ".js";
                            modelOptions.data = params;
                            controllerOptions.template = sails.config.codegen.controllerCodeTemplate;
                            controllerOptions.data = params;
                            controllerOptions.savetofolder = "api/controllers/" + params.table + "Controller.js";
                            var renderoutput;
                            try {
                                ViewRenderingService.render(modelOptions);
                                ViewRenderingService.render(controllerOptions);
                            } catch (err) {
                                res.send(err);
                            }
                        }                       
                        res.send(params);
                    }
                })
            }
        });
    },
    //-----------------------------------------------
    //
    //------------------------------------------------
    tabledef: function (req, res) {
        sails.hooks.views.render(sails.config.codegen.queryTabledefTemplate, {}, function (err, view) {
            if (err) {
                res.send(err);
            } else {
                sails.log.debug(sails.config.codegen.queryTabledefTemplate);
                sails.models.user.query(view, function (err, results) {
                    if (err) {
                        res.send(err);
                    } else {                       
                        res.send(results.rows);
                    }
                })
            }
        });
    },
    //-----------------------------------------------
    //
    //------------------------------------------------
    viewdef: function (req, res) {
        sails.hooks.views.render(sails.config.codegen.queryViewdefTemplate, {}, function (err, view) {
            if (err) {                
                res.send(err);
            } else {
                sails.log.debug(sails.config.codegen.queryViewdefTemplate);
                sails.models.user.query(view, function (err, results) {
                    if (err) {
                        res.send(err);
                    } else {                       
                        res.send(results.rows);
                    }
                })
            }
        });
    }
};

