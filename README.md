# Standard Nucleotide BLAST (Rachel Wei)
This web app performs BLAST serach for nucleotides 

## Demo
For now, this app is deployed on AWS ECS to test at this ip/port [http://52.10.155.41:5000/](http://52.10.155.41:5000/). Docker setup is in docker folder/docker-compose. 

## Installation/Setup
Before running this web app, make sure the Python dependencies have been installed. Run:  
```
pip install -r requirements.txt
```

To run the app, use the command:  
``` 
python app.py
```

This app will be running on localhost at port `5000`. To test the app, go to `http://127.0.0.1:5000`.

