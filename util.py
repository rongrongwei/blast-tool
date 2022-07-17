from Bio.Blast import NCBIWWW
import xmltodict
import json

def fasta_check(filestring):
    """This function checks if a string is formatted correctly
    in the FASTA format.
    https://learn.gencore.bio.nyu.edu/ngs-file-formats/fastaa-format/
    https://en.wikipedia.org/wiki/FASTA_format 

    Args:
        filestring (str): the input str to check

    Returns:
        bool: True is if correctly formatted otherwise False
    """

    lines = filestring.splitlines()

    # check first line of file to make sure that it starts with '>'
    if lines[0][0] != '>':
        return False

    # check that the file has more than 1 line
    if len(lines) < 2:
        return False

    # check that the file has valid nucleotide characters
    for line in lines[1:]:
        i = 0
        while i < len(line):
            if line[i:i+3] == '(i)':
                i+=2
            elif line[i] not in "ACGTURYKMSWBDHVN-acgturykmswbdhvn":
                return False  
            i += 1
    return True

def blast_wrapper(fasta_file):
    """This function sends request to biopython BLAST api and converts 
    StringIO to json format after extracting results.

    Args:
        fasta_file (str): FASTA format string

    Returns:
        str: results of blast search as json 
        "[{"a":"b", "b":"c"}, {"d":"e", "f":"g"}]"
    """
    res = NCBIWWW.qblast("blastn", "nt", fasta_file) # StringIO object
    res = res.getvalue() #string
    d = xmltodict.parse(res) # dictionary
    dlist = d['BlastOutput']['BlastOutput_iterations']['Iteration']['Iteration_hits']['Hit'] # list of dict
    json_result = json.dumps(dlist) #string
    return json_result