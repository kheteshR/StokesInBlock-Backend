'use strict';
const nodemailer = require('nodemailer');
// const verifyHash=require("./functions/VerificationOfHash")
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'rapiddms@gmail.com',
		pass: 'winpoc2018@'
	}
});
const AllTokenRequests=require('./functions/GetTokenRequest');
const useridentity=require('./functions/Tokenization')
const Sign=require('./functions/SignData')
const Duplicate = require('./functions/DuplicateRequestLength')
const Nexmo = require('nexmo');
const Signature = require('./functions/Signature');
const nexmo = new Nexmo({
	apiKey: '3817c13a',
	apiSecret: 'AFzjbdGvUteeOuk8'
});
const VerifyByBlockchain = require("./functions/VerificationOfHash")
const GetAuditTrailHallTicket = require("./functions/GetAuditTrailHallTicket");
const UpdateAdmitDetails = require("./functions/UpdateAdmitDetail");
const History = require("./functions/Admit_cardUpdate");
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const StatusStepper = require("./functions/AdmitCardStatusStepper");
const AdminUploadHSC = require("./functions/AdminUploadHSC");
const AdminUploadSSC = require("./functions/AdminUploadSSC");
const AdminUploadDocument = require("./functions/AdminUploadDocument");
const UserIndividualHallTicket = require("./functions/UserIndividualHallTicket")
const LengthOfRecords = require("./functions/Length_of_Records")
const StatusProcessed = require("./functions/StatusVerification");
var StatusProcessedByDivisional = require("./functions/DivisionalBoard");
const TotalInformation = require("./functions/RetrieveAllForm");
var AuditDetails = require("./functions/AuditTrails");
var IssuedDocument = require("./functions/ForIssuedDocument");
var login = require("./functions/loginUser");
var AllRequest = require("./functions/GetAllRequest");
var ShareDocuments = require("./functions/Sharing");
var RequestForUpdate = require("./functions/RequestForUpdate");
var GetParticulrRepo = require("./functions/GetParticulrRepo");
var ChangeDocument = require("./functions/DocUpdate");
let ipfs = require('ipfs-api')({
	host: "localhost",
	port: 5001,
	protocol: "http"
});
var fs = require('fs');
var cors = require('cors');
var multer = require('multer');
var crypto = require('crypto');
var md5sum = crypto.createHash('md5');
const RequestOutOfChain = require("./functions/RequestOutOfChain");
var upload = multer({
	dest: '/tmp/'
});
const nem = require("nem-sdk").default;
const register = require('./functions/register');
const contractJs = require('./functions/contract');
var users = require("./models/account")
var UploadFunction = require("./functions/upload")
var GetIndividualDocument = require("./functions/GetIndividualDocument")
var uploads = require("./models/uploaded")
var IndividualRecordSearchBlockchain = require('./functions/IndividualRecordSearchBlockchain')
const jwt = require('jsonwebtoken');
var path = require('path');
var mime = require('mime');
var verify = require('./functions/verify');
var verificationDoc = require('./functions/verify1');
var admitDetails = require('./functions/admitDetails');
const ConvertToPdf = require('./functions/PdfConvert');
const PdfOf_SSCMarksheet = require('./functions/PdfOf_SSCMarksheet')
//==============================================mock services========================================//
module.exports = router => {
	router.post('/mock', cors(), function (req, res) {
		console.log(req.body);
		res.send({
			message: "mock mock"
		})

	})

	//================pdf download===============
	router.get('/download', function (req, res) {
		var file = __dirname + '/mypdf.pdf';
		console.log("file path======>>>", file)
		res.download(file); // Set disposition and send it.
	});
	router.get('/downloadFilehallticket', function (req, res) {
		var file = path.join(__dirname, 'hallticket.pdf');
		res.download(file, function (err) {
			if (err) {
				console.log("Error");
				console.log(err);
			} else {
				console.log("Success");
			}
		});
	});
	// ==========================covert json to pdf SSC marksheet================================
	router.post('/Convert_SSC_ToPdf', cors(), function (req, res) {

		var Seat_Number = req.body.Seat_Number;
		var candiName = req.body.candiName;
		var fatherName = req.body.fatherName;
		var HallCenter = req.body.HallCenter;
		var motherName = req.body.motherName;
		var dob = req.body.dob;
		var MobNo = req.body.MobNo;
		var TypeOform = req.body.TypeOform;

		console.log("All data=====>>", Seat_Number, candiName, fatherName, HallCenter, motherName, dob, MobNo, TypeOform);
		PdfOf_SSCMarksheet.PdfDocumentSSCMARKSHEET(Seat_Number, candiName, fatherName, HallCenter, motherName, dob, MobNo, TypeOform)
			.then(result => {
				res.send({
					result: result
				})
			})
	})
	// ==========================covert json to pdf hallticket================================
	router.post('/ConvertToPdf', cors(), function (req, res) {

		var Seat_Number = req.body.Seat_Number;
		var candiName = req.body.candiName;
		var fatherName = req.body.fatherName;
		var HallCenter = req.body.HallCenter;
		var motherName = req.body.motherName;
		var dob = req.body.dob;
		var MobNo = req.body.MobNo;
		var TypeOform = req.body.TypeOform;

		console.log("All data=====>>", Seat_Number, candiName, fatherName, HallCenter, motherName, dob, MobNo, TypeOform);
		ConvertToPdf.PdfDocument(Seat_Number, candiName, fatherName, HallCenter, motherName, dob, MobNo, TypeOform)
			.then(result => {
				res.send({
					result: result
				})
			})
	})
	//=============================(3)get all requests================================
	router.post('/RequestAll', (req, res) => {
		var RxAddress = req.body.RxAddress;
		
		AllTokenRequests.GetAllReq(RxAddress).then(result => {
			console.log("result==========>>>>", result);
			res.status(result.status).json({
				Result: result.request
			});
		})
	})
	// ============================(2)Sharing Documents Api============================
	router.post('/InitiateRequest', (req, res) => {
		var status = "Request Initiated From Customer";
		var userId = req.body.userId;
		var SpendingAmount=req.body.SpendingAmount;
		var NumberOfToken=req.body.NumberOfToken;
		var RxAddress=req.body.RxAddress;
		
		ShareDocuments.Sharing(userId, status,SpendingAmount,NumberOfToken,RxAddress).then(result => {
			console.log("result==========>>>>", result);
			res.status(result.status).json({
				Result: result.result
			
			
			});

		})
	})
	//=========================(5)Smart contract for settlement==================
	router.post('/Settlement', (req, res) => {
		var _id = req.body._id;
		var status ="Bank Processed Amount ";
		
		console.log("status=======>>>", status);
		StatusProcessedByDivisional.SetStatusByDivisionalBoard(_id, status)
			.then(result => {
				res.send({
					message: "Processed successfully by bank",
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//=======================(4)Approve and Reject by bank========================
	router.post('/RequestUpdate', (req, res) => {
		var _id = req.body._id;
		var status = req.body.status;
		var message = req.body.message;
		var NoOfToken="";
		console.log("Getting Id=======>>>", _id,status,message,NoOfToken);
		History.HallTicketUpdate(status,_id,message,NoOfToken).then(result => {
			console.log("Individual of result", result);
			res.send({
				result: result
			});

		})
	})

// ==========================(1)User identity for verification request================================
router.post('/user_identity_request',cors(),function (req,res){

   var firstname =req.body.firstname;
   var lastname =req.body.lastname;
   var usertype  =req.body.usertype;
   var age       =req.body.age;
   var aadhar=req.body.aadhar;
   var pan=req.body.pan;
   var address=req.body.address;
   var emailid=req.body.emailid;
   var userId=req.body.userId
   var status="data processed"

   console.log("All data=====>>",firstname,lastname,usertype,age,pan,aadhar,address,emailid,status);
  useridentity.data_for_useridentity (firstname,lastname,usertype,age,pan,aadhar,address,emailid,status,userId)
   .then(result=>{
           res.send({
               result:result
           })
       }
   )
})
	// ============================Sharing Documents Api============================
	router.post('/TokenizeAsset', (req, res) => {
		var filehash = req.body.filehash;
		var status = req.body.status;
		var userId = req.body.userId;
		var CompanyName = "RapidQube Digital Solution PVT LTD"
		ShareDocuments.Sharing(userId, filehash, status, CompanyName).then(result => {
			console.log("result==========>>>>", result);
			res.status(result.status).json({
				Result: result.message,
				Transaction: result.TransactionHash,
				TotalOutput: result.TotalOutput,
				SenderName: result.SenderName,
				DocType: result.DocType
			});

		})
	})
	// ==============Get all values from user for updateadmit card===========
	router.post('/UpdateadmitValues', (req, res) => {
		console.log("request object===>>", req.body)
		var id = req.body.id;
		var TypeOform = req.body.propertyType;
		var userId = req.body.userId;
		var candiName = req.body.candiName;
		var motherName = req.body.motherName;
		var fatherName = req.body.fatherName;
		var dob = req.body.dob;
		var MobNo = req.body.MobNo;
		var RollNo = req.body.RollNo;
		var AdharNo = req.body.AdharNo;
		var schoolCode = req.body.schoolCode;
		var schoolName = req.body.schoolName; //    var previousHashes=req.body.previousHashes;


		console.log("see all inputs==>>", TypeOform, userId, candiName, motherName, fatherName)
		console.log("see all inputs==>>", dob, MobNo, RollNo, AdharNo, schoolCode, schoolName)
		console.log("see all inputs==>>", dob, MobNo, RollNo, AdharNo, schoolCode, schoolName)
		UpdateAdmitDetails.UpdateAdmitCard(id, TypeOform, userId, candiName, motherName, fatherName, dob, MobNo, RollNo, AdharNo, schoolCode, schoolName)
			.then(result => {
				res.send({
					message: "admit card forwarded successfully",
					result: result.result

				});
			})
			.catch(err => {
				res.send({
					status: 500
				});
			})
	});
	// ==============Get all values from user for admit card===========
	router.post('/admitValues', (req, res) => {
		console.log("request object===>>", req.body)
		var TypeOform = req.body.propertyType;

		var userId = req.body.userId;
		var candiName = req.body.candiName;
		var motherName = req.body.motherName;
		var fatherName = req.body.fatherName;
		var dob = req.body.dob;
		var MobNo = req.body.MobNo;
		var RollNo = req.body.RollNo;
		var AdharNo = req.body.AdharNo;
		var schoolCode = req.body.schoolCode;
		var schoolName = req.body.schoolName;
		var ResidentialAddr = req.body.ResidentialAddr;
		var uniqid = req.body.uniqid;
		var status = req.body.status;
		var ApplicationStatus = req.body.ApplicationStatus;
		var InstitueStatus = req.body.InstitueStatus;
		var DivisionalStatus = req.body.DivisionalStatus;
		var HallCenter = req.body.HallCenter;
		var Seat_Number = req.body.Seat_Number;
		var txHash = req.body.txHash;
		//    var previousHashes=req.body.previousHashes;


		console.log("see all inputs==>>", TypeOform, userId, candiName, motherName, fatherName)
		console.log("see all inputs==>>", dob, MobNo, RollNo, AdharNo, schoolCode, schoolName)
		console.log("see all inputs==>>", dob, MobNo, RollNo, AdharNo, schoolCode, schoolName)
		admitDetails.getAdmitDetails(HallCenter, Seat_Number, status, uniqid, candiName, ResidentialAddr, motherName, RollNo, fatherName, dob, schoolCode, AdharNo, schoolName, userId, TypeOform, MobNo, InstitueStatus, DivisionalStatus, ApplicationStatus, txHash)
			.then(result => {
				res.send({
					message: "admit card forwarded successfully",
					result: result.data._id

				});
			})
			.catch(err => {
				res.send({
					status: 500
				});
			})
	});
	//================================fetch all data from nem and make audit trail of hall ticket process========================
	router.post('/HallTicketUpdateAuditTrail', (req, res) => {
		var _id = req.body._id;
		console.log("Getting Id=======>>>", _id);
		GetAuditTrailHallTicket.AuditTrailOfAdmitCard(_id).then(result => {
			console.log("Individual of result", result);
			res.send({
				result: result.result

			});

		})
	})
	//================================Full Audit Trail  for hall ticket========================
	router.post('/HallTicketUpdate', (req, res) => {
		var _id = req.body._id;
		var status = req.body.status;
		var walletName = req.body.walletName;
		var message = req.body.message;
		console.log("Getting Id=======>>>", _id);
		History.HallTicketUpdate(walletName, status, _id, message).then(result => {
			console.log("Individual of result", result);
			res.send({
				result: result.result,
				TransactionHash: result
			});

		})
	})
	//  ==================================GetUserid admit card status=========================
	router.post('/AdmitCardStatus', (req, res) => {
		var userId = req.body.userId;
		StatusStepper.GetDocuments(userId)
			.then(result => {
				res.send({
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//=============================(admin)length of hsc =============
	router.post('/AdminUploadHSC', (req, res) => {

		AdminUploadHSC.GetDocumentsHSC()
			.then(result => {
				res.send({
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//==========================(admin)length of  ssc======================
	router.post('/AdminUploadSSC', (req, res) => {

		AdminUploadSSC.GetDocumentsSSC()
			.then(result => {
				res.send({
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//=======================(Admin)fetch all uploaded data====================
	router.post('/AdminUpload', (req, res) => {

		AdminUploadDocument.GetDocuments()
			.then(result => {
				res.send({
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//  ==============Retrive all values from mongo =====================

	router.post('/RetriveAllForm', (req, res) => {

		TotalInformation.RetriveAll()
			.then(result => {
				res.send({
					message: "successfully retrived",
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//=========================verify by divisional board==================
	router.post('/VerificationProcessByDivisionalBoard', (req, res) => {
		var userId = req.body.userId;
		var TypeOform = req.body.TypeOform;
		var id = req.body.id;
		console.log("userId=======>>>", userId);
		StatusProcessedByDivisional.SetStatusByDivisionalBoard(id, userId, TypeOform)
			.then(result => {
				res.send({
					message: "Processed successfully bydivisional board",
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//=======================sending mail=================================
	router.post('/sendMail', (req, res) => {
		var email = req.body.email;
		var subject = req.body.subject;
		var text = req.body.text;
		console.log('entered email.??????????', email)
		var mailOptionss = {
			from: 'rapiddms@gmail.com',
			to: email,
			subject: subject,
			text: text
		};

		console.log('mail objects????????????', mailOptionss)

		transporter.sendMail(mailOptionss, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		res.send({
			"message": "email alert send successfully"
		})
	});
	//=========================Verification Process========================
	router.post('/VerificationProcess', (req, res) => {
		var userId = req.body.userId;
		var TypeOform = req.body.TypeOform;
		var Id = req.body._id;
		console.log("userId=======>>>", Id, userId);
		StatusProcessed.SetStatus(Id, userId, TypeOform)
			.then(result => {
				res.send({
					message: "Processed successfully by institute",
					"Result": result.result
				});
			}).catch(err => {
				res.status(err.status).json({
					message: err.message
				});
			})
	});
	//================================Get All Initiated Request========================
	router.post('/GetAllGeneratedRequest', (req, res) => {
		var RecipientuserId = req.body.userId;

		console.log("Getting userId=======>>>", RecipientuserId);
		AllRequest.GetAllReq(RecipientuserId).then(result => {
			console.log("Individual of result", result);
			res.send({
				message: result,
				result: result.request
			});

		})
	})
	//===================record length=========
	router.post('/LengthOfRecordsSSC', (req, res) => {
		var Type = req.body.TypeOform;

		console.log("Getting userId=======>>>", Type);
		LengthOfRecords.GetLength(Type).then(result => {
			console.log("Length of Individual  result", result);
			res.send({
				ResultForSSC: result.SSCresult.length
			});

		})
	})
	//==============For HSC===================
	router.post('/LengthOfRecordsHSC', (req, res) => {
		var Type = req.body.TypeOform;

		console.log("Getting userId=======>>>", Type);
		LengthOfRecords.GetLength(Type).then(result => {
			console.log("Length of Individual  result", result);
			res.send({
				ResultForHSC: result.SSCresult.length
			});

		})
	})

	//===============================Hall Ticket Notification================================
	router.post('/HallTicketForUser', (req, res) => {
		var Type = req.body.userId;

		console.log("Getting userId=======>>>", Type);
		UserIndividualHallTicket.GetNotify(Type).then(result => {
			console.log("Length of Individual  result", result);
			res.send({
				Result: result,
				Length: result.SSCresult.length
			});

		})
	})


	//============================Request From out of chain===================================
	router.post('/RequestFromOutChain', (req, res) => {
		var RecieverAccount = req.body.RecieverAccount;
		var SenderName = req.body.SenderName;
		var request = req.body.DocumentType;
		var status = req.body.status;
		console.log("Getting address=======>>>", RecieverAccount);
		console.log("status=======<<<<", status);
		RequestOutOfChain.Request(RecieverAccount, SenderName, request, status).then(result => {
			console.log("Individual of result", result);
			res.status(result.status).json({
				messgae: result.message,

			});

		})
	})
	//=============================All ipfs hosted file(history of hosted data for user )=========================
	router.post('/GetHistoryNEM', (req, res) => {
		var name = req.body.name;
		console.log("Getting name=======>>>", name)
		IndividualRecordSearchBlockchain.history(name).then(result => {
			console.log("Individual of result", result);
			res.status(result.status).json({
				history: result.message
			});

		})
	})
	//===============================for issued document=================
	router.post('/GetIssuedDocument', (req, res) => {
		var userId = req.body.userId;
		console.log("Getting userId=======>>>", userId)
		IssuedDocument.Issued(userId).then(result => {

			res.status(result.status).json({
				TotalObject: result.result
			});

		})
	})
	//=============================All ipfs hosted file=========================

	router.post('/GetIndividualDocument', (req, res) => {
		var name = req.body.name;
		var SeatNumber = req.body.SeatNumber;
		var userId = req.body.userId;
		// var status="Document Fetched Successfully"
		GetIndividualDocument.GetIndividual(name, SeatNumber, userId)
			.then((result) => {
				console.log("query sucessfull", result.output.filesHash[0].hash)
				res.send({
					"Hash": result.output.filesHash[0].hash,
					"output": result.output,
					"BC_Data": result.BC_Data
				})
			})

	})
	//==============================Audit Trail Details==================================
	router.post('/AuditTrail', (req, res) => {
		var userID = req.body.userId;

		AuditDetails.GetAllReq(userID)
			.then((result) => {
				console.log("query sucessfull", result)
				res.send({
					"message": "fetched",

					"output": result
				})
			})

	})
	//=============================Get Version Control===================================

	router.post('/GetVersionControl', (req, res) => {


		GetIndividualDocument.GetIndividual(name, SeatNumber)
			.then((result) => {
				console.log("query sucessfull", result)
				res.send({
					"message": "fetched",
					"Hash": result.result[0].filesHash[0].hash,
					"output": result.result
				})
			})

	})
	// ============================updating document======================================
	router.post('/UpdateDocument', upload.single("file"), function (req, res) {
		console.log("body=================>", req.body);
		var documentType = req.body.DocumentType;
		console.log("documentType=================>", documentType);
		var Name = req.body.Name;
		console.log("name=================>", Name);
		var status = req.body.status;
		console.log("status=================>", status);
		var message = req.body.message;
		console.log("message=================>", message);


		var file = __dirname + "/images" + "/" + req.file.originalname;
		console.log("file------>>", file)
		fs.readFile(req.file.path, function (err, data) {
			console.log(" req.file.path=====>>>", req.file.path)
			var cont = req.file.path
			ipfs.util.addFromFs(cont, function (err, fileOutput) {
				console.log("files===========>", fileOutput)
				console.log(err)

				ChangeDocument.UpdateDocuments(fileOutput, documentType, Name, "Admin", message, status)
					.then(result => {
						console.log(result)
						res.status(200).json({
							"Updatedresult": result
						});
					}).catch(err => res.status(err.status).json({
						message: err.message
					}))
			})
		})
	})
	// ====================================User Request==============================================

	router.post('/RequetForUpdateDocument', cors(), function (req, res) {
		// userId=0482
		var Id = req.body.Id;
		console.log("userId", userId);
		var userId = req.body.userId;
		console.log("userId", userId);
		var documentType = req.body.documentType;
		console.log("documentType", documentType);
		var name = req.body.name;
		console.log("name", name)
		var SeatNo = req.body.SeatNo;
		console.log("SeatNo", SeatNo);
		var message = "wrong name";
		console.log("message", message);
		var ContentHash = req.body.hash
		var status = "Request Initiated by user";
		console.log("message", status);
		var usertype = "user";
		console.log("usertype", usertype);

		RequestForUpdate.Request(Id, userId, name, SeatNo, ContentHash, documentType, usertype, message, status)
			.then(
				result => {
					res.send({
						status: 200,
						output: result
					})

				}
			)


	})
	//==============================verify document from blockchain=============================
	router.post('/GetContentHashForVerification', cors(), (req, res) => {

		var name = req.body.name;
		console.log("Hash of Document", name);
		var Doc = req.body.DocumentType;
		console.log(Doc);
		var SeatNumber = req.body.SeatNumber;
		console.log(SeatNumber);


		verify.GetHash(name, Doc, SeatNumber)
			.then(result => {
				// console.log("Hash varified successfully", result)
				res.send({
					message: "Verified",
					Result: result

				})

			})
	})


	//=============================storing in ipfs===============================================
	var response;
	var usertype;
	router.post('/file_upload', upload.single("file"), function (req, res) {
		var documentType = req.body.DocumentType;
		var name = req.body.name;
		var SeatNumber = req.body.SeatNumber;
		var status = "successfully uploaded"
		var CreatedBy = req.body.CreatedBy;

		console.log("Type of document", documentType)
		console.log("body=================>", req.body);
		var file = __dirname + "/images" + "/" + req.file.originalname;
		console.log("file------>>", file)
		fs.readFile(req.file.path, function (err, data) {
			console.log(" req.file.path=====>>>", req.file.path)
			var cont = req.file.path
			ipfs.util.addFromFs(cont, function (err, fileHash) {
				console.log("files===========>", fileHash)
				console.log(err)

				UploadFunction.UploadDocuments(fileHash, documentType, SeatNumber, name, "Admin", status, CreatedBy)
					.then(result => {
						res.send({
							status: 201,
							path: file,
							result: result.Documents
						})

					});

			})
		})

    });
    //=============================Digitally sign all data==============================
    router.post('/SignDuplicateMarksheet', cors(), function (req, res) {
        var DuplicateRequestStatus = "Digitally Signed";
        var userId=req.body.userId;
        var name=req.body.name;

		console.log("All SignDuplicateMarksheet======>", DuplicateRequestStatus,name,userId);
		Sign.KeypairSignature(name,userId,DuplicateRequestStatus)
			.then(
				result => {
					res.send({
						result: result.Record
					})
				}
			)
	})
	//=======================Get Request of Duplicate Marksheet==========================
	router.post('/DuplicateMarksheetRequestCount', cors(), function (req, res) {
		var DuplicateRequestStatus = req.body.DuplicateRequestStatus;
		console.log("All DuplicateRequestStatus======>", DuplicateRequestStatus);
		Duplicate.get(DuplicateRequestStatus)
			.then(
				result => {
					res.send({
						result: result.Record
					})
				}
			)
	})
	//=======================Request Duplicate Marksheet=================================
	router.post('/DuplicateMarksheetRequest', cors(), function (req, res) {
		var userId = req.body.userId;
		var name = req.body.name;
		var TotalMarks = req.body.TotalMarks;
		var Session = req.body.Session;
		var propertyType = req.body.propertyType;
		var DuplicateRequestStatus = req.body.DuplicateRequestStatus;
		console.log("All data======>", userId, name, TotalMarks, Session, propertyType, DuplicateRequestStatus);

		Signature.SignDuplicateMarksheet(userId, name, TotalMarks, Session, propertyType, DuplicateRequestStatus)
			.then(
				result => {
					res.send({
                        result: result
                        })
				}
			)
	})

	//=======================get all repository document=====================
	router.post('/GetParticularUserDocuments', cors(), function (req, res) {
		var userId = req.body.userId;

		console.log("userId", userId);

		GetParticulrRepo.GetParticulrDocumets(userId)
			.then(
				result => {
					res.send({
						result: result
					})
				}
			)
	})
	//==================================================================================//
	router.post('/render', function (req, resp) {
		var file = req.body.fileData
		resp.send({
			"file": file
		})
	});
	//=================================registerUser===================================================================//
	router.get('/', (req, res) => res.end('Welcome to para-ins!'));
	//=================================login with otp============================
	router.post('/newLogin', cors(), (req, res) => {
		var phonetosend = req.body.phone;
		console.log("phone", phonetosend)
		const UserName = req.body.walletName;
		console.log("UserName", UserName)
		const password = req.body.password;
		console.log("password", phonetosend)

		var otp = "";
		var possible = "0123456789";
		for (var i = 0; i < 4; i++)
			otp += possible.charAt(Math.floor(Math.random() * possible.length));
		console.log("otp" + otp);

		var otptosend = 'your otp is ' + otp;

		if (!phonetosend) {

			res
				.status(400)
				.json({
					message: 'Invalid Request !'
				});

		} else {

			login
				.login(UserName, phonetosend, otp)
				.then(result => {
					const token = jwt.sign(result, config.secret, {
						expiresIn: 60000
					})

					nexmo
						.message
						.sendSms('919768135452', phonetosend, otptosend, {
							type: 'unicode'
						}, (err, responseData) => {
							if (responseData) {
								console.log(responseData)
							}
						});
					res.send({

						"message": "Login Successful",
						"status": true,
						token: token,
						"usertype": result.users,
						"userid": result.users.userId,
						otp: result.otp
					});
				})
				.catch(err => res.status(500).json({
					status: 500,
					message: err.message
				}).json({
					status: 500,
					status: err.status
				}));
		}
	});
	router.post('/login', cors(), function (req, res) {
		const UserName = req.body.walletName;
		const password = req.body.password;

		login
			.login(UserName, password)
			.then(result => {
				console.log("result ===>>>", result)

				const token = jwt.sign(result, "Rpqb@123", {
					expiresIn: 60000000000
				})
				res.status(result.status).json({
					"message": "Login Successful",
					"status": true,
					token: token,
					"usertype": result.users,
					"userid": result.users.userId

				});


			})
			.catch(err => res.status(err.status).json({
				message: err.message
			}).json({
				status: err.status
			}));
	})


	router.post('/registerUser', cors(), function (req, res) {
		console.log(req.body)
		var phonetosend = req.body.phone;
		const walletName = req.body.walletName;
		console.log("walletName==========>>>", walletName)
		// Set a password
		const password = req.body.password;
		console.log("password==========>>>", password)
		// Set a usertype
		const usertype = req.body.usertype;
		console.log("usertype==========>>>", usertype)
		// Create PRNG wallet
		const nem_id = nem.model.wallet.createPRNG(walletName, password, nem.model.network.data.mijin.id);
		console.log("nem_id=================Check Address==>>>", nem_id.accounts[0].address)
		var endpoint = nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
		console.log("endpoint=================Check endpoint==>>>", nem_id)
		// Create a common object
		var common = nem.model.objects.create("common")(password, "");
		console.log("common=================Check common==>>>", nem_id)
		console.log("common===========>>", common)

		// Get the wallet account to decrypt
		var walletAccount = nem_id.accounts[0];
		console.log("walletAccount===========>>", walletAccount)

		// Decrypt account private key 
		nem.crypto.helpers.passwordToPrivatekey(common, walletAccount, "pass:bip32");

		// The common object now has a private key
		console.log("my private key :" + JSON.stringify(common.privateKey))
		const privateKey = common.privateKey;
		var userId = "";
		var possible = "0123456789674736728367382772898366377267489457636736273448732432642326734"
		for (var i = 0; i < 4; i++)
			userId += (possible.charAt(Math.floor(Math.random() * possible.length))).toString();
		console.log("userId" + userId)
		if (!walletName || !usertype || !password || !userId) {

			res
				.status(400)
				.json({
					message: 'Invalid Request !'
				});

		} else {
			register.registerUser(nem_id, privateKey, walletName, password, usertype, nem_id.accounts[0].address, userId, phonetosend)

				.then(result => {

					res.status(result.status).json({
						message: result.message,
						usertype: usertype
					});

				})
				.catch(err => res.status(err.status).json({
					message: err.message
				}).json({
					status: err.status
				}));
		}
	});


	//=====================verify hash with blockchain data===============
	router.post('/VerifyHashFromBlockchain', cors(), (req, res) => {

		// var hash = req.body.hash;
		// console.log("Hash of Document", hash)
		var TransactionHash = req.body.TransactionHash;
		console.log("Hash of TransactionHash", TransactionHash)

		VerifyByBlockchain.CompareHash(TransactionHash)
			.then(result => {
				console.log("Hash varified successfully", result)
				res.send({
					message: "Verified",
					output: result
				})

			})
	})

	//=========== verifying document with the mongo data=========  
	router.post('/verifyDocument', cors(), (req, res) => {
		var hash = req.body.hash;
		console.log("hash of document", hash)
		verificationDoc.verifydoc(hash)
			.then(result => {
				res.send({
					message: "Hash verified successfullly",
					result: result.output
				});

			})
			.catch(err => {
				res.status(err.status).json({
					message: err.message
				})
			});
	})
}