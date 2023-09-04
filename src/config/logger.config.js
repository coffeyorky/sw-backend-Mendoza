const winston = require('winston')

const customLevelOptions = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}
// const mode = 'development'
// const logger = winston.createLogger({
//     levels: customLevelOptions.levels,
//     transports:[
//         modo === 'development' ?
//             new winston.transports.Console()
//             :
//             new winston.transports.File()
//     ]
// })

const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports:[       
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warning',
            format: winston.format.simple()
        })
    ]
})

// addLogger (middleware)

module.exports = {
    logger
}
