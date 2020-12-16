import numpy as np

file1 = []
with open('ЕКГ_КП6_1.txt') as f:
    for line in f:
        inner_list = [elt.strip() for elt in line.split('   ')]
        inner_list.remove('')
        for a in inner_list:
            file1.append(float(a))
            
            
file2 = []
with open('ЕКГ_КП6_2.txt') as f:
    for line in f:
        inner_list = [elt.strip() for elt in line.split('   ')]
        inner_list.remove('')
        for a in inner_list:
            file2.append(float(a))

i = 0
tt = 0.01
t1 = []
while i < len(file1):
    t1.append(tt)
    tt+=0.05
    i+=1
    
i = 0
tt = 0.01
t2 = []
while i < len(file2):
    t2.append(tt)
    tt+=0.05
    i+=1

grad1 = np.gradient(file1,t1)
grad2 = np.gradient(file2,t2)



f = open("grad1.txt", "w")
f.write(','.join(map(str, grad1.tolist())))
f.close()

f = open("grad2.txt", "w")
f.write(','.join(map(str, grad2.tolist())))
f.close()

