/**
 * Created by cabbage on 26/06/2017.
 */

module.exports = {
    path : '/:storeId',
    getComponent(nextState,cb){
        require.ensure([],(require)=>{
            cb(null,require('../containers/PageContainer/pageContainer').default)
        },'HomePage')
    }
}