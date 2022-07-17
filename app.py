from flask import Flask, make_response
from flask import request
import util

app = Flask(__name__) # create Flask instance app

@app.route('/', methods=['GET'])
def index(): # return html to the browser
    with open('static/index.html', 'rt') as myfile:
        s = myfile.read()
    return s

@app.route('/blastQuery', methods=['POST'])
def blast():
    body = request.form # sequence sent to flask api
    # print(body['seq'])
    if util.fasta_check(body['seq']):
        json_result = util.blast_wrapper(body['seq'])
        # for frontend prototyping (blast is slow)
        # with open('test_cache.json', 'wt') as tcache:
        #     tcache.write(json_result)
        # with open('test_cache.json', 'rt') as tcache:
        #     json_result = tcache.read()
        return make_response(json_result,200)
    else:
        return make_response("{\"Error\":\"Not FASTA format sequence\"}",400)


if __name__ == "__main__":
    app.run(host='127.0.0.1', port = 5000, debug = True)
