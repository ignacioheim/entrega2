const config = require('../models/config.js')

class controllerPersistencia{
    setPersist(persistencia, productos){
        const setDB = new config()
    
        if(persistencia === 0){
            const db = setDB.enmemoria(productos)
            return db
            
        }else if(persistencia === 2){
            const db = setDB.mariadb()
            return db
        
        }else if(persistencia === 3 || persistencia === 6){
            
            const db = setDB.mongodb(persistencia)
            return db

        }else if(persistencia === 4){
            const db = setDB.sqlite()
            return db
        
        } else if(persistencia === 5){
            const db = setDB.fireBase()
            return db
        
        }
    }
}

module.exports = controllerPersistencia