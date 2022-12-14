/**
 * @param {Object} [options]
 * @param {boolean} options.everyRequest=false - Reset session ID automatically every request
 */
function fixation(options) {
    options = options || {};
    return function(req, res, next) {
        req.resetSessionID = function() {
            return new Promise(function(resolve, reject) {
                let session = req.session;
                req.session.regenerate(function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        for (let i in session) {
                            if (!req.session[i]) {
                                req.session[i] = session[i];
                            }
                        }
                        resolve();
                    }
                });
            });
        }
        if (options.everyRequest && req.headers['X-Requested-With'] !== 'XMLHttpRequest' && !req.xhr) {
            req.resetSessionID().then(function() {
                next();
            }).catch(function(err) {
                next(err);
            });
        } else {
            next();
        }
	}
}

module.exports = fixation;