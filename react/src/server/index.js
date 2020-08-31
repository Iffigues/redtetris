import {serveSrv} from './srv'

module.exports.create = function create(params){
	let srv = serveSrv(params);
	console.log("ici");
 	return srv.creates(params);
}
